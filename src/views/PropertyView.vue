
<script setup>
    import { useRoute } from 'vue-router';
    import { doc } from 'firebase/firestore';
    import { useFirestore, useDocument } from 'vuefire'; 
    import { propertyPrice } from '@/helpers';
    import { watch } from 'vue';

    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
    import useLocationMap from '@/composables/useLocationMap';

    const { zoom, center } = useLocationMap();

    const route = useRoute();
    const db = useFirestore();
    const docRef = doc(db, 'properties', route.params.id);
    const property = useDocument(docRef);

    watch(property, (property) => {
        console.log('location', property.location);
        setTimeout(() => {
            center.value = property.location;
        }, 2000);
    });
</script>

<template>
    <v-card flat>
        <v-card-title class="mt-5 text-h3 text-center py-5 font-weight-bold">
            {{ property?.title }}
        </v-card-title>

        <v-img :src="property?.image" height="550" cover />

        <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row align-center">
            <v-card-text>
                Precio:
                <span class="font-weight-bold">{{ propertyPrice(property?.price) }}</span>
            </v-card-text>

            <v-card-text>
                Baños:
                <span class="font-weight-bold">{{ property?.wc }}</span>
            </v-card-text>

            <v-card-text>
                Estacionamiento:
                <span class="font-weight-bold">{{ property?.parking }}</span>
            </v-card-text>

            <v-card-text>
                Habitaciones:
                <span class="font-weight-bold">{{ property?.rooms }}</span>
            </v-card-text>
        </div>

        <v-row>
            <v-col
                cols="12"
                md="8"
            >
                <div class="text-pre-wrap py-10">
                    {{ property?.description }}
                </div>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
                <div class="py-10" style="height: 600px;">
                    <LMap 
                        ref="map" 
                        :zoom="zoom" 
                        :center="center" 
                        :use-global-leaflet="false"
                    >
                        <LMarker 
                            :lat-lng="center"
                        >
                            <LPopup>
                                {{ property?.title }}
                            </LPopup>
                        </LMarker>
                        <LTileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        ></LTileLayer>
                    </LMap>
                </div>
            </v-col>
            
        </v-row>
        
    </v-card>
</template>

<style>
    .text-pre-wrap {
        white-space: pre-wrap;
    }
</style>