/**********************************************
 *
 *     ARCHIVO DE CONFIGURACION FIREBASE
 *
 **********************************************/

import firebase from 'firebase/app';
import 'firebase/firestore';

// Configuración firebase endo
const firebaseConfig = {
  apiKey: 'AIzaSyC933NshJuLO18cNc0mIh6P4dbE7HI0zM0',
  authDomain: 'endo-3785b.firebaseapp.com',
  databaseURL: 'https://endo-3785b.firebaseio.com',
  projectId: 'endo-3785b',
  storageBucket: 'endo-3785b.appspot.com',
  messagingSenderId: '216340475966',
  appId: '1:216340475966:web:71a0f734ec43eb489d616f',
  measurementId: 'G-6BHXLCXJ4K',
};

// Inicializar firebase
firebase.initializeApp(firebaseConfig);

// Inicializamos firestore
const db = firebase.firestore();

export { db };
