import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Screen from '../Components/Screen'
import { Talukas } from '../config/Taluka'
import { Hospitals } from '../config/Hospitals';

export default function HomeScreen() {
  const [selectedId, setSelectedId] = useState(null);
  const [allHospitals,setHospitals] = useState(Hospitals);

  const GetHospitals = (data) => {
    setSelectedId(data.id);
    setHospitals(data.hospitals);
}
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#FDCE93" : "#60F4F5";
    const color ='black';
    return (
      <Item
        item={item}
        onPress={() => GetHospitals(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <Screen style={styles.container}>
       <Text style={styles.title}>साताऱ्या मधील तालुके - </Text>
       <View style={styles.TalukaContainer}>
       <FlatList
       style={styles.flat}
        data={Talukas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        extraData={selectedId}
      />
       </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'flex-start'
  },
  TalukaContainer:{
    height:'10%'
  },
  flat:{ 
      padding:10,
      borderTopWidth:3,
      borderTopColor:"black",
      borderBottomWidth:3,
      borderBottomColor:"black",
  },
  item:{
    padding:10,
    backgroundColor : "grey",
    borderRadius:12,
    marginLeft:10,
    justifyContent:"flex-start",
    textAlign:'center',  
 },
  title :{
    margin:10,
    fontSize:20
},
})