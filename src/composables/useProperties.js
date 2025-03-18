import { collection, doc, deleteDoc } from "firebase/firestore"
import { ref as storageRef, deleteObject } from "firebase/storage"
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire"
import { computed, ref } from "vue"

export default function useProperties() {
    
    const pool = ref(false)
    const db = useFirestore()
    const storage = useFirebaseStorage()

    const propertiesCollection =  useCollection(collection(db, 'properties'))

    const FilteredProperties = computed(() => {
        return pool.value ? propertiesCollection.value.filter(property => property.pool) : propertiesCollection.value
    })

    async function deleteProperty({ id, image }) {
        console.log('Deleting property with id:', id)
        console.log('Deleting image with path:', image)

        if(confirm('Deseas eliminar esta propiedad?')) {
            const docRef = doc(db, 'properties', id)
            const imageRef = storageRef(storage, image)
            
            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ]);
            
        }
    }

    return {
        propertiesCollection,
        FilteredProperties,
        pool,
        deleteProperty
    }
}