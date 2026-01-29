const firebaseConfig = {
  apiKey: "AIzaSyBwO4ot0Xfjv3TytDvQz8evL6vikJ8Ccf0",
  authDomain: "gamestore-87c8f.firebaseapp.com",
  projectId: "gamestore-87c8f",
  storageBucket: "gamestore-87c8f.firebasestorage.app",
  messagingSenderId: "992675942152",
  appId: "1:992675942152:web:7bea80b3134c5a192f66bd",
  measurementId: "G-2VW7EM9DQJ"

};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();
