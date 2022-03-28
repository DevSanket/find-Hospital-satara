import { StyleSheet, Text, ScrollView,View } from 'react-native'
import React,{useState,useEffect} from 'react'
import Screen from '../Components/Screen'
import HistoryCard from '../Components/HistoryCard';
import useAuth from '../auth/useAuth'
import Firebase from '../config/firebase'
import ActivityIndicator from '../Components/ActivityIndicator';

export default function AppointmentHistory() {
  const {userData} = useAuth();
  const [Data,setData] = useState([]);
  const db = Firebase.firestore();
  const [loading,setLoading] = useState(false);


  //Firebase Data featch
  useEffect(() => {
    setLoading(true);
    db.collection('AppUsers').doc(userData.id).collection('Appointments_History').onSnapshot(snapshot => {
        setData(snapshot.docs.map(
            doc => (
                {
                id:doc.id,
                contact_no:doc.data().contact_no,
                disease:doc.data().disease,
                email:doc.data().email,
                name:doc.data().name,
                date: doc.data().date
            })))
    });
    setLoading(false);
},[]);




  return (
    <>
    <ActivityIndicator visible={loading} />
    <Screen>
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.title}>Appointment History</Text>
        </View>
        {
          Data.length ? 
          Data.map(data => <HistoryCard
          key={data.id}
            name={data.name}
            date={data.date.seconds}
            contact_no={data.contact_no}
            email={data.email}
            />) :<Text style={styles.text}>
            आपल्याकडे जुन्या अपॉईंटमेंट नाहीत!
            !</Text>
        }
      </ScrollView>
    </Screen>
    </>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        padding:10
    },
    title:{
        fontSize:20,
        textTransform:"uppercase",
        padding:5
    },
    text :{
      width:300,
    fontSize : 20,
    textAlign:'center',
    alignSelf:'center'
    }
})