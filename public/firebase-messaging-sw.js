importScripts("https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js");

if (firebase.messaging.isSupported()) {
  const firebaseConfig = {
    apiKey: "AIzaSyCvG5cjdVH8JuREv14sg4vGJC_AmDIjDvk",
    authDomain: "haflory-55053.firebaseapp.com",
    databaseURL: "https://haflory-55053.firebaseio.com",
    projectId: "haflory-55053",
    storageBucket: "haflory-55053.appspot.com",
    messagingSenderId: "109422201",
    appId: "1:109422201:web:1ad62ab797a18ed050d6a8",
    measurementId: "G-5VZBQYZZ48"
  };

  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function (cloudMessage) {
    //do nothing
  });
}
