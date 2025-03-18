<script setup>
    import useProperties from '@/composables/useProperties';
    import { propertyPrice } from '@/helpers';

    const { propertiesCollection, deleteProperty } = useProperties();

</script>

<template>
    <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>

    <v-btn
        color="blue"
        variant="flat"
        :to="{ name: 'new-property' }"
    >
        Nueva propiedad
    </v-btn>

    <v-card class="mx-auto mt-10" flat> 
        <v-list>
            <v-list-item
                v-for="property in propertiesCollection"
                :key="property.id"
            >
                <template v-slot:prepend>
                    <v-list-item-media :start="true">
                        <img :src="property.image" width="180" />
                    </v-list-item-media>
                </template>
                <template v-slot:append>
                    <v-btn
                        color="info"
                        variant="flat"
                        class="mr-2"
                        :to="{ name: 'edit-property', params: { id: property.id } }"
                    >Editar
                    </v-btn>

                    <v-btn
                        color="red-darken-3"
                        variant="flat"
                        @click="deleteProperty(property)"
                    >Eliminar
                    </v-btn>
                </template>

                <v-list-item-title>{{ property.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ propertyPrice(property.price) }}</v-list-item-subtitle>

            </v-list-item>
        </v-list>
    </v-card>
</template>

