import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, arrayUnion,getDoc,setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);


export const storeFormData = async (collectionName, useAutoId, formData, customId = '') => {
    try {
        if (useAutoId) {
            // Add document with auto-generated ID
            const docRef = await addDoc(collection(db, collectionName), formData);
            console.log("Document written with ID: ", docRef.id);
            return docRef.id; // Return the auto-generated ID if needed
        } else {
            // Add document with custom ID
            if (!customId) {
                throw new Error('Custom ID is required when useAutoId is false.');
            }
            await setDoc(doc(db, collectionName, customId), formData);
            console.log("Document written with custom ID: ", customId);
            return customId; // Return the custom ID if needed
        }
    } catch (e) {
        console.error("Error saving document: ", e);
        throw e; // Rethrow the error if needed
    }
};

export const storeFormDataWithEmailVerification = async (collectionName, useAutoId, formData, email) => {
    try {
        // Store the form data and get the document ID
        const docId = await storeFormData(collectionName, useAutoId, formData);
        
        console.log("Document written with ID: ", docId);

        // Reference to the user document
        const userDocRef = doc(db, 'User', email);

        // Check if the user document exists
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            // Create a new user document if it doesn't exist
            await setDoc(userDocRef, {
                publishedDocs: []  // Initialize with an empty array
            });
            console.log("New user document created.");
        }

        // Update the user document with the new document ID
        await updateDoc(userDocRef, {
            publishedDocs: arrayUnion(docId)
        });

        console.log("User document updated with new published document ID.");
    } catch (e) {
        console.error("Error saving document with email verification: ", e);
        throw e;
    }
};










export { db };


