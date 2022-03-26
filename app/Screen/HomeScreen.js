import { StyleSheet, Text, View,FlatList,TouchableOpacity,ScrollView,ToastAndroid } from 'react-native'
import React,{useState,useEffect} from 'react'
import Screen from '../Components/Screen'
import { Talukas } from '../config/Taluka'
import Firebase from '../config/firebase';
import HospitalCard from '../Components/HospitalCard';
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen({navigation}) {
  const [selectedId, setSelectedId] = useState();
  const [allHospitals,setHospitals] = useState([]);
  const [SortedHospitals,setSortedHospitals] = useState([]);
  
  const showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "A wild toast appeared!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const db = Firebase.firestore();

  useEffect( () => {
    try {
      db.collection('hospitals').onSnapshot(
        snapshot => {
          setHospitals(snapshot.docs.map(
            doc => ({
              id:doc.id,
              Contact_No: doc.data().Contact_No,
              Images : doc.data().Images,
              Address : doc.data().Address,
              email: doc.data().email,
              name:doc.data().name,
              Taluka: doc.data().Taluka.label
            })
          ))
        }
    );
    } catch (error) {
      console.log(error);
    } 
    setSortedHospitals(allHospitals);
},[]);

  const GetHospitals = (data) => {
    setSelectedId(data.id);
    const newHospitals = allHospitals.filter(hospital => hospital.Taluka.toLowerCase() === data.eng.toLowerCase());
    setSortedHospitals(newHospitals);
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
      <ScrollView>
      {SortedHospitals.length ? 
      SortedHospitals.map(hospital => (
        <HospitalCard 
        key={hospital.id}
        details={hospital}
        onPress={() => navigation.navigate('Hospital_Details',{hospital})}
      />
      ))
      : <Text>No Data</Text>}
      </ScrollView>
      <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      style={styles.profileButton} >
        <AntDesign name="user" size={30} color="white"/>
      </TouchableOpacity>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'flex-start'
  },
  TalukaContainer:{
    height:'10%',
    width:"100%"
  },
  flat:{ 
      padding:10,
      borderTopWidth:3,
      borderTopColor:"black",
      borderBottomWidth:3,
      borderBottomColor:"black",
      marginRight:10
  },
  item:{
    padding:10,
    backgroundColor : "grey",
    borderRadius:12,
    marginLeft:10,
    marginRight:10,
    justifyContent:"flex-start",
    textAlign:'center',  
 },
  title :{
    margin:10,
    fontSize:20
},
profileButton: {
  height: 70,
  width: 70,
  bottom:0,
  right:10,
  backgroundColor: "#1DA1F2",
  position: "absolute",
  alignSelf: "flex-end",
  alignItems: "center",
  justifyContent:'center',
  margin:20,
  borderRadius:50,
  elevation:10
},
})