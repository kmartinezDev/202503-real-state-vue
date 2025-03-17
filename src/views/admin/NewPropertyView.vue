<script setup>
    import { useRouter } from 'vue-router';
    import { collection, addDoc } from 'firebase/firestore';
    import { useFirestore } from 'vuefire';

    import { useForm, useField } from 'vee-validate';
    import { validationSchema, imageSchema } from '@/validation/propertySchema'
    import useImage from '@/composables/useImage'
    import useLocationMap from '@/composables/useLocationMap';

    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

    const { handleSubmit } = useForm({
        validationSchema : {
            ...validationSchema,
            ...imageSchema
        }
    });

    const { uploadImage, imageUrl, url } = useImage()
    const { zoom, center, pin } = useLocationMap()

    const db = useFirestore()
    const router = useRouter()

    const title = useField('title')
    const image = useField('image')
    const price = useField('price')
    const rooms = useField('rooms')
    const wc = useField('wc')
    const parking = useField('parking')
    const description = useField('description')
    const pool = useField('pool', null, {initialValue: false})

    const submit = handleSubmit( async (values) => {

        const {image, ...property} = values;

        const docRef = await addDoc(collection(db, "properties"), {
            ...property,
            image: url.value,
            location: center.value
        });
        if (docRef.id) {
            router.push({ name: 'admin-properties' })
        }
    });

    const items = [1,2,3,4,5]
</script>

<template>
    <v-card max-width="800" flat class="mx-auto my-10">
        <v-card-title
            class="text-h4 font-weight-bold"
            tag="h3"
        >
            Nueva propiedad
        </v-card-title>
        <v-card-subtitle
            class="text-h6 py-5"
        >
            Crear una nueva propiedad llenando el siguiente formulario
        </v-card-subtitle >

        <v-form class="mt-10">
            <v-text-field 
                class="mb-5"
                label="Titulo Propiedad"
                v-model="title.value.value"
                :error-messages="title.errorMessage.value"
            />
            <v-file-input 
                class="mb-5"
                label="Imagen"
                accept="image/*"
                prepend-icon="mdi-camera"
                v-model="image.value.value"
                :error-messages="image.errorMessage.value"
                @change="uploadImage"
            />

            <div v-if="imageUrl" class="my-5">
                <p class="font-weight-bold"> Imagen de la Propiedad:</p>
                <img :src="imageUrl" alt="property" class="w-50">
            </div>

            <v-text-field 
                class="mb-5"
                label="Precio"
                v-model="price.value.value"
                :error-messages="price.errorMessage.value"
            />

            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="Habitaciones"
                        class="mb-5"
                        :items="items"
                        v-model="rooms.value.value"
                        :error-messages="rooms.errorMessage.value"
                    />
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="WC"
                        class="mb-5"
                        :items="items"
                        v-model="wc.value.value"
                        :error-messages="wc.errorMessage.value"
                    />
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="Lugares de estacionamiento"
                        class="mb-5"
                        :items="items"
                        v-model="parking.value.value"
                        :error-messages="parking.errorMessage.value"
                    />
                </v-col>
            </v-row>

            <v-textarea 
                class="mb-5" 
                label="Descripción"
                v-model="description.value.value"
                :error-messages="description.errorMessage.value"
                >
            </v-textarea>

            <v-checkbox 
                label="Piscina" 
                v-model="pool.value.value"
            />  

            <h2 class="font-weight-bold text-center my-5"> Ubicacion </h2>
            <div class="pb-10">
                <div style="height:600px;">
                    <LMap 
                        ref="map" 
                        :zoom="zoom" 
                        :center="center" 
                        :use-global-leaflet="false"
                    >
                        <LMarker 
                            :lat-lng="center"
                            draggable
                            @moveend="pin"
                        />
                        <LTileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        ></LTileLayer>
                    </LMap>
                </div>
            </div>
            
            <v-btn
                color="pink-accent-3"
                block=""
                @click="submit"
            >
                Agregar propiedad
            </v-btn>
        </v-form>
    </v-card>
</template>