<script setup>
    defineProps({
        property: {
            type: Object,
            required: true
        },
        propertyPrice: {
            type: Function,
            required: true
        }
    });
</script>

<template>
    <v-col
        cols="12"
        md="4"
    >
        <v-card>
            <v-img :src="property.image" height="200" cover />

            <v-card-title class="font-weight-bold">
                {{ property.title }}
            </v-card-title>

            <v-card-text class="text-truncate">
                {{  property.description }}
            </v-card-text>

            <v-card-text class="text-h5 font-weight-bold">
                Precio: {{ propertyPrice(property.price) }}
            </v-card-text>

            <template v-slot:actions>
                <v-btn 
                    block
                    color="info"
                    variant="tonal"
                    :to="{ name: 'property', params: { id: property.id } }"
                >
                    Ver informacion
                </v-btn>
            </template>
        </v-card>
    </v-col>
</template>

