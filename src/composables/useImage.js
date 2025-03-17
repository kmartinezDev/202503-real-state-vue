import { ref as storageRef } from "firebase/storage"
import { useFirebaseStorage, useStorageFile } from "vuefire"
import { computed } from "vue"
import { uid } from "uid"

export default function useImage() {

    const storage = useFirebaseStorage()
    const storageRefPath = storageRef(storage, `properties/${uid()}`)

    const {
        url,                        // URL de la imagen
        uploadProgress,             // Progreso de la subida, de 0 a 100
        uploadError,                // Error de la subida
        uploadTask,                 // Tarea de subida
        upload                      // Función para subir la imagen
    } = useStorageFile(storageRefPath)

    const uploadImage = async (e) => {
        
        const data = e.target.files[0]

        if (data) {
            await upload(data)
        }

        console.log('Imagen subida:', url)
    }

    const imageUrl = computed(() => url.value ?? null)

    return {
        url,
        uploadImage,
        imageUrl
    }
}