import { StyleSheet, Text, View,TextInput,TouchableOpacity,ToastAndroid } from 'react-native'
import React,{useState} from 'react'
import Screen from '../Components/Screen'
import defaultStyle from '../config/styles';
import Firebase from '../config/firebase';


export default function ForgotPassword() {
    const [email,setEmail] = useState('');

    HandleSubmit = async () => {
        if(email !== ''){
            await Firebase.auth().sendPasswordResetEmail(email).then(() => {
                ToastAndroid.show("email send successfully!",ToastAndroid.SHORT);
                setEmail('')
            }).catch(err => {
                ToastAndroid.show("Check Your Email Again!",ToastAndroid.SHORT)
            })
        }
        else{
            ToastAndroid.show("Please Enter Email!",ToastAndroid.SHORT)
        }
    }

  
    return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <View style={styles.InputContainer}>
      <TextInput
      value={email}
      onChangeText={text => setEmail(text)}
      placeholder='Enter Email' style={defaultStyle.text} />
      </View>
    <TouchableOpacity
    onPress={HandleSubmit}
    style={styles.button} >
        <Text>Submit</Text>
    </TouchableOpacity>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container :{
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:20
    },
    InputContainer:{
        backgroundColor : defaultStyle.colors.light,
        borderRadius:15,
        flexDirection : "row",
        padding:15,
        marginVertical:10,
        borderWidth:1,
        borderColor:"#000",
        width:"80%",
        margin:10
    },
    button:{
        width:"80%",
        backgroundColor:"#7AF9E3",
        alignContent:"center",
        alignItems:"center",
        padding:10,
        borderRadius:10,
        elevation:5
    }
})