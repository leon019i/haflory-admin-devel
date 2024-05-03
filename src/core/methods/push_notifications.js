import firebase from "firebase/app";
import "firebase/messaging";

import { subscribeChatNotification } from "../../chat/methods/subscribe_chat_notification";

export function initializeFirebase() {
  if (firebase.messaging.isSupported()) {
    const firebaseConfig = {
      apiKey: "AIzaSyCvG5cjdVH8JuREv14sg4vGJC_AmDIjDvk",
      authDomain: "haflory-55053.firebaseapp.com",
      databaseURL: "https://haflory-55053.firebaseio.com",
      projectId: "haflory-55053",
      storageBucket: "haflory-55053.appspot.com",
      messagingSenderId: "109422201",
      appId: "1:109422201:web:1ad62ab797a18ed050d6a8",
      measurementId: "G-5VZBQYZZ48",
    };

    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    Notification.requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then((token) => {
        if (
          localStorage.getItem("apollo-token-haflory") &&
          localStorage.getItem("HAFLORY_PUSH_TOKEN") !== token
        ) {
          subscribeChatNotification(token).then((data) => {
            if (!!data.data && data.data.subscribeChatNotification) {
              // console.log("data",data)
              localStorage.setItem("HAFLORY_PUSH_TOKEN", token);
            }
          });
        }
      })
      .catch((error) => {
        console.log(
          "push_notifications:initializeFirebase:requestPermission:Error:",
          error
        );
      });
  }
}
