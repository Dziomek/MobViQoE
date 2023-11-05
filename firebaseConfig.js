import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCfrsRBXafKO0UDFYzJILj4d_Vra5y_lAQ",
    authDomain: "qoe-app-beca2.firebaseapp.com",
    projectId: "qoe-app-beca2",
    storageBucket: "qoe-app-beca2.appspot.com",
    messagingSenderId: "882143677590",
    appId: "1:882143677590:web:1959c0b70e64e72b3d46b7",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)