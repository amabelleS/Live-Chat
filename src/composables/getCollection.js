import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

const getCollection = (collection) => {
  const error = ref(null);
  const documents = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy('createdAt');

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];

      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = 'Could not fetch data';
    }
  );

  watchEffect((onInvalidate) => {
    //unsubscribe from prev collections when watcher is stopped (component unmount)
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
