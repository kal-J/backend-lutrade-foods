const fb = require('firebase/app');
const config = require('./config/firebase');
require('firebase/auth');
require ('firebase/firestore');


const firebase = !fb.apps.length ? fb.initializeApp(config) : fb.app();

module.exports = firebase;