import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Constants  from 'expo-constants';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId
  };



  let Firebase = firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore();
  export const createUserProfile = async (user) => {
    if(!user) return;
    const userRef = firestore.doc(`AppUsers/${user.id}`);
    const snapshot = await userRef.get();



    if(!snapshot.exists){
      const {email,name,photoUrl,id} = user;
      //formatting Date
      const createdAt = firebase.firestore.FieldValue.serverTimestamp();
      //Images
      try {
        await userRef.set({
          email,
          id,
          name,
          photoUrl,
          createdAt,
          AppointmentsHistory:[],
          RunningAppointments:[]
        });
      } catch (error) {
        console.log('Error while creating User ',error.message);
      }
    }
    return userRef;

  }


  export default Firebase; 