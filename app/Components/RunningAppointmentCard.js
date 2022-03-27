import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../config/colors'
import {Entypo} from '@expo/vector-icons'
import IconButton from './IconButton'
import Firebase from '../config/firebase'
import useAuth from '../auth/useAuth'



export default function RunningAppointMentCard({name,disease,phone_no,email,HandleCheck}) {

 

  return (
   <View style={styles.Card}>
        <View style={styles.historyCard}>
      <View style={styles.Checklogo}>
        <Entypo size={25} name="user" />
      </View>
      <View style={styles.Details}>
           <Text>Name :- {name}</Text> 
           <Text>Email :- {email}</Text>
           <Text>Contact No :- {phone_no}</Text>
           <Text>Disease :- {disease}</Text>
      </View>
    </View>
    <View style={styles.ButtonContainer}>
        <IconButton onPress={HandleCheck} name="check"  style={{width:150,backgroundColor:'#34eb49'}}/>
        <IconButton name="phone" style={{width:150,backgroundColor:'#34a8eb'}} />
      </View>
   </View>
  )
}

const styles = StyleSheet.create({
    Card:{
         padding:15,
        borderRadius:5,
        margin : 20,
        elevation:10,
        backgroundColor :colors.white,
    },
    historyCard:{
        flexDirection:'row',
        justifyContent:'center',
       
        
    },
    Checklogo:{
        width:75,
        backgroundColor:colors.gray,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
    },
    Details:{
        height:'100%',
        marginLeft:30,
        alignSelf:'flex-start',
        textAlignVertical:'center'
    },
    ButtonContainer:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
})