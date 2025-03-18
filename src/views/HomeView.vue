<script setup>
    import useProperties from '@/composables/useProperties';
    import Property from '@/components/Property.vue';
    import { propertyPrice } from '@/helpers';
    const { pool, FilteredProperties } = useProperties();
</script>

<template>
    <h1 class="text-center text-h3 font-weight-bold my-5">Nuestras propiedades</h1>

    <v-card flat class="py-10">
        <v-card-title>
            Busqueda
            <v-checkbox label="Piscina" v-model="pool" />

        </v-card-title>

        <v-row>
            <Property 
                v-for="property in FilteredProperties"
                :key="property.id"
                :property="property"
                :propertyPrice="propertyPrice"
            />
        </v-row>
    </v-card>
</template>
