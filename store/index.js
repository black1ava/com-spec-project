var firebaseConfig = {
  apiKey: "AIzaSyDFCMvR0s73fqgL3xPxCYe7-JlUokldK9U",
  authDomain: "com-spec-pro.firebaseapp.com",
  projectId: "com-spec-pro",
  storageBucket: "com-spec-pro.appspot.com",
  messagingSenderId: "878144238002",
  appId: "1:878144238002:web:6d1e19e4b2dc46835c34ab",
  measurementId: "G-WNJE8P57FG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });