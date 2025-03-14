<script setup>
    import { useForm, useField } from 'vee-validate'
    import { loginSchema as validationSchema } from '@/validation/loginSchema'
    import { useAuthStore } from '@/stores/auth'
    
    const { handleSubmit } = useForm({ validationSchema })
    const authStore = useAuthStore()

    const email = useField('email')
    const password = useField('password')

    const submit = handleSubmit( values => {
        authStore.login(values)
    })

</script>

<template>
    <v-card
        flat
        max-width="600"
        class="mx-auto my-10"
    >
        <v-card-title
            class="text-h4 font-weight-bold"
            tag="h3"
        >
            Iniciar sesion
        </v-card-title>
        <v-card-subtitle
            class="text-h6"
        >
            Inicia sesion para poder administrar tus propiedades
        </v-card-subtitle>

        <v-alert
            v-if="authStore.hasError"
            :title="authStore.errorMsg"
            type="error"
            class="my-5"
        ></v-alert>

        <v-form class="mt-5">
            <v-text-field 
                type="email"
                label="Email"
                class="mb-3"
                bg-color="blue-grey-lighten-5"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            />

            <v-text-field 
                type="password"
                label="Password"
                class="mb-3"
                bg-color="blue-grey-lighten-5"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"

            />

            <v-btn
                block
                color="pink-accent-3"
                @click="submit"
            >
                Iniciar sesion
            </v-btn>
        </v-form>
    </v-card>
</template>
