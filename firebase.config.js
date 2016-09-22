const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyBd42s65938TJy-y4LOt8gWJPyyLyJKZjw",
    authDomain: "projectmap-bf209.firebaseapp.com",
    databaseURL: "https://projectmap-bf209.firebaseio.com",
    storageBucket: "projectmap-bf209.appspot.com",
    messagingSenderId: "378694922157"
  };
  firebase.initializeApp(config);

module.exports = firebase;
