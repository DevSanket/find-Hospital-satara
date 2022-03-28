import { useContext } from "react";
import AuthContext from './context';
import authStorage from './storage';
import Firebase from '../config/firebase';

export default useAuth = () => {
    const {userData,setUserData} = useContext(AuthContext);
    const db = Firebase.firestore();
    

    const logOut = () =>  {
        setUserData(null);
        authStorage.removeData();
    }

    const logIn = async (user) => {
       await db.collection('AppUsers').doc(user.uid).get()
         .then(snapshot => 
        setUserData(snapshot.data()));
        authStorage.storeData(user);
    }

    return {userData,setUserData,logOut,logIn};

}