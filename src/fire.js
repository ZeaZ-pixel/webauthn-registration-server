import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAeYCe-SO8dbCp7KofAn0vZbiI4AuM6GRY",
    authDomain: "registration-fcf33.firebaseapp.com",
    projectId: "registration-fcf33",
    storageBucket: "registration-fcf33.appspot.com",
    messagingSenderId: "188371386207",
    appId: "1:188371386207:web:75cbdb0246372c217a00ea"
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;