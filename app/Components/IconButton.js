import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';


export default function IconButton({name,onPress,style}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn,style]}>
              <MaterialCommunityIcons name={name} size={30} color="white" />
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn:{
        height:40,
        width:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.secondary,
        borderRadius:5,
      }
})