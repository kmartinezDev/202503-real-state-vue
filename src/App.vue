<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

</script>

<template>
  <v-card
    elevation="3"
    max-width="1200"
    class="mx-auto"
  >
    <v-layout>
      <v-app-bar
        color="blue-darken-1"
      >

      <template v-slot:prepend>
        <v-btn :to="{ name: 'home' }">
          BIENES RAICES - VUEFIRE
        </v-btn>
      </template>

      <template v-slot:append>
        <div v-if="authStore.isAuth">
          <v-btn :to="{ name: 'admin-properties' }"> Admin </v-btn>
          <v-btn  @click="authStore.logout"> Cerrar sesion </v-btn>

        </div>
        <div v-else>
          <v-btn :to="{ name: 'home' }"> Inicio </v-btn>
          <v-btn :to="{ name: 'login' }"> Iniciar sesion </v-btn>
        </div>
        
      </template>
      
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
      
    </v-layout>
  </v-card>
</template>

<style scoped>

</style>
