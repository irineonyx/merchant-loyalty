// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCwFFJQ3FiLySKX1xkrDNjlWIJSFKqc_Wk",
    authDomain: "loyalty-app-8fd13.firebaseapp.com",
    projectId: "loyalty-app-8fd13",
    storageBucket: "loyalty-app-8fd13.appspot.com",
    messagingSenderId: "737118787186",
    appId: "1:737118787186:web:671732e0958fcb0abe14eb"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Retrieve firebase messaging
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });