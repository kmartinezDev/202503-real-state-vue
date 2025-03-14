import { defineStore } from "pinia";
import { ref, computed, onMounted } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const router = useRouter()

    onMounted(() => {
        onAuthStateChanged(auth, user => {
            if(user){
                authUser.value = user
            }
        })
    })

    const customErrorMap = {
        'auth/user-not-found': 'Usuario no encontrado. Por favor, inténtelo de nuevo.',
        'auth/wrong-password': 'Password incorrecto. Por favor, inténtelo de nuevo.',
        'auth/invalid-credential': 'Credenciales inválidas. Por favor, inténtelo de nuevo.',
    };

    const errorMsg = ref('')

    const login = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then( userCredential => {
                authUser.value = userCredential.user
                router.push({ name: 'admin-properties' })
            })
            .catch( error => {
                errorMsg.value = customErrorMap[error.code] || error.message
            });
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                authUser.value = null
                router.push({ name: 'login' })
            })
            .catch(error => {
                console.error(error)
            })
    }

    const hasError = computed(() => errorMsg.value !== '')

    const isAuth = computed(() => authUser.value !== null)

    return {
        login,
        logout,
        errorMsg,
        authUser,
        hasError,
        isAuth
    }
});