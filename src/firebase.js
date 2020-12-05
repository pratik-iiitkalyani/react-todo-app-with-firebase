import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyALVdklsBR8_1A4-sEOtHfFCJZRXeYjqWo",
    authDomain: "todo-app-d0938.firebaseapp.com",
    databaseURL: "https://todo-app-d0938.firebaseio.com",
    projectId: "todo-app-d0938",
    storageBucket: "todo-app-d0938.appspot.com",
    messagingSenderId: "36049552360",
    appId: "1:36049552360:web:4f1d64f53f708b98059a5d",
    measurementId: "G-LTQD4YWSHV"
})

const db = firebaseApp.firestore();

export default  db ;