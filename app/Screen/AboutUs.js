import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import Screen from '../Components/Screen'
import AppText from '../Components/AppText/Text'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default function AboutUs() {
  return (
    <Screen style={styles.container}>
      <AppText style={styles.title}>About us</AppText>
      <Text style={styles.info}>
          Hi Everyone These our first step to automate hospital facilities for you these app will help you to get contact direct to hospital and book an appointment its become so fun also you can track your records not just for hospital but also for userbase as well..
      </Text>
      <View style={styles.dataContainer}>
        <Image style={styles.img} source={require('../assets/sanketImg.jpg')} />
          <Text style={styles.lastText}>Developed By Sanket Sabale</Text>
          <Text style={styles.lastText}>( Codemock )</Text>
      </View>
      <View style={styles.version}>
      <MaterialCommunityIcons name='android' size={25} color="lightgreen" />
      <AppText style={{color:"gray"}}>Version 1.0.0</AppText>
      </View>
     
    </Screen>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-evenly'
    },
    title:{
        // textAlign:"center",
        fontSize:20,
        alignSelf:"center"
    },
    info:{
        padding:10,
        fontSize:15
    },
    version:{
        alignItems:"center",
    },
    lastText:{
        textAlign:"center",
        fontWeight:'bold'
    },
    dataContainer:{
        justifyContent:"center",
        alignItems:"center",
    },
    img:{
        height:50,
        width:50,
        borderRadius:50,
        marginBottom:10
    }
})