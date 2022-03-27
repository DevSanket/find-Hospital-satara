import { StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native'
import React,{useState} from 'react'
import Screen from '../Components/Screen'
import Firebase, { createUserProfile } from '../config/firebase'

import useAuth from '../auth/useAuth';
import * as Google from 'expo-google-app-auth';

export default function LoginScreen() {
    const  {userData,logIn} = useAuth();
    const HandleLogin = async () => {
      const config = {
        androidClientId:`543362340836-gujr93b7b29jpqpkh91qkqlbor1sfjfn.apps.googleusercontent.com`,
        scopes : ['profile','email']
      };

      

      // Google.logInAsync(config).then((result) => {
      //     const {type,user} = result;
      //     if(type === 'success'){
      //       createUserProfile(user);
      //       logIn(user);
      //     }else{
      //       console.log("Type Error");
      //     }
      // }).catch(err => {
      //   console.log(err);
      // })
    }

  return (
    <Screen style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-hospital.png")}
        />
        <TouchableOpacity style={styles.Google}
        onPress={HandleLogin} >
        <Image
        style={{height:40,width:40,marginRight:10}}
          source={require('../assets/google.png')}
        />
        <Text>GOOGLE SIGN IN</Text>
      </TouchableOpacity>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
    Google:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        backgroundColor:'#63DFF6',
        borderRadius:10,
        elevation:10
    },
    logo: {
        height: 150,
        width: 150,
        alignSelf:"center"
      },
})