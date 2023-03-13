// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwFFJQ3FiLySKX1xkrDNjlWIJSFKqc_Wk",
  authDomain: "loyalty-app-8fd13.firebaseapp.com",
  projectId: "loyalty-app-8fd13",
  storageBucket: "loyalty-app-8fd13.appspot.com",
  messagingSenderId: "737118787186",
  appId: "1:737118787186:web:671732e0958fcb0abe14eb"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BIw4Q1gm9dOJbKEn7ZhmU-XkR70mGs6k415HOCl6rjQOtdEOUPGmQgBYVYfs5Wt6nDErA2FmaUUyJfLHZBoSUL0'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }
  
  export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
  });