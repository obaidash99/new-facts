// Import the functions you need from the SDKs you need
import { firebase, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC-b-Imrwp-vM7yTCf6TOx0du8J5sCchVg',
	authDomain: 'today-i-learned-76872.firebaseapp.com',
	projectId: 'today-i-learned-76872',
	storageBucket: 'today-i-learned-76872.appspot.com',
	messagingSenderId: '120305744322',
	appId: '1:120305744322:web:e734413dfe584527e03e5b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Enable state presistence
firebaseConfig.auth().setPresistence(firebase.auth.Auth.Presistence.LOCAL);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new firebase.auth.GoogleAuthProvider();
