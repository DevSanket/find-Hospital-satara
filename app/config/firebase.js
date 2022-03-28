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
  export const createUserProfile = async (user,Images,userData) => {
    if(!user) return;
    const userRef = firestore.doc(`AppUsers/${user.uid}`);
    const snapshot = await userRef.get();



    if(!snapshot.exists){
      const {email} = user;
      //formatting Date
      const createdAt = firebase.firestore.FieldValue.serverTimestamp();
      //Images
      let newImages = [];

    for (let i = 0; i < Images.length; i++) {
        let response = await fetch(Images[i]);
        let blob = await response.blob();
        let ref = Firebase.storage().ref().child(`users/${Date.now()}`);
        await (ref.put(blob)); 
        let link = await ref.getDownloadURL();
        newImages.push(link);
    }


      try {
        await userRef.set({
          email,
          id : user.uid,
          photoUrl:newImages[0],
          createdAt,
          ...userData
        });
      } catch (error) {
        console.log('Error while creating User ',error.message);
      }
    }
    return userRef;

  }


  export default Firebase; 