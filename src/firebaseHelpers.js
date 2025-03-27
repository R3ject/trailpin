// src/firebaseHelpers.js
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export const savePinToFirestore = async (pinData, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'pins'), { ...pinData, userId });
    console.log('Pin saved with ID:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export const loadPinsFromFirestore = async (userId) => {
  try {
    const pinsCollection = collection(db, 'pins');
    const q = query(pinsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const loadedPins = [];
    querySnapshot.forEach((docSnap) => {
      loadedPins.push({ id: docSnap.id, ...docSnap.data() });
    });
    console.log('Loaded pins:', loadedPins);
    return loadedPins;
  } catch (error) {
    console.error('Error loading pins:', error);
    return [];
  }
};

export const deletePinFromFirestore = async (pinId) => {
  try {
    await deleteDoc(doc(db, 'pins', pinId));
    console.log('Pin deleted with ID:', pinId);
  } catch (error) {
    console.error('Error deleting pin:', error);
    throw error;
  }
};
