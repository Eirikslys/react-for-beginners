import Rebase from 're-base';
// react firebase specific package
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBkQejKp4WptT_tkDRiDRWpTEjHHD8ULBU",
  authDomain: "catch-of-the-day-eirik-l.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-eirik-l-default-rtdb.firebaseio.com",
  appId: "1:598219962223:web:d3419bebc85c8c70c69a9a"
});


const base = Rebase.createClass(firebase.database())

// named export
export { firebaseApp };

export default base;
