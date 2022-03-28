import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Linking
} from "react-native";
import React, { useState } from "react";
import Screen from "../Components/Screen";
import AppText from "../Components/AppText";
import { ErrorMessage, Form,FormField,SubmitButton } from '../Components/forms'
import * as Yup from "yup";
import IconButton from "../Components/IconButton";
import Firebase from '../config/firebase';
import useAuth from "../auth/useAuth";
const validationSchema = Yup.object().shape({
  Patient_Name: Yup.string().max(255).required('Patient Name is required'),
  Patient_Contact_No : Yup.number().required('Password is required'),
  Patient_Disease : Yup.string().required('Disease is required'),
});

export default function HospitalDetails({ navigation, route }) {
  const { name, Address, Contact_No, email, Images,id } = route.params.hospital;
  const [mainImg, setMainImg] = useState(Images[0]);
  const {userData} = useAuth();
  const db = Firebase.firestore();

  const showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Your Appointment Saved!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const handleSubmit = async ({Patient_Name,Patient_Contact_No,Patient_Disease,Hospital_id}) => {
          // 1. store data in users pending Appointments
            const dataRef =  db.collection('AppUsers').doc(userData.id).collection("RunningAppointments");
             
            dataRef.add({
              name,
              email,
              Address,
              disease : Patient_Disease,
              Contact_No,
              date : new Date()
            })
          //2. send Data to DB in  NewAppointmentsRequest
           const userRef = db.collection('hospitals').doc(id).collection('NewAppointments');
           userRef.add({
            name : Patient_Name,
            email : userData.email,
            disease : Patient_Disease,
            contact_no : Patient_Contact_No,
            Image : userData.photoUrl,
            date : new Date()
           });
           showToast();
           navigation.navigate('RunningAppointments');

  }

  return (
    <Screen>
      <ScrollView>
        <Image style={styles.image} source={{ uri: mainImg }} />

        <View style={styles.detailsContainer}>
          <ScrollView horizontal>
            <View style={styles.container}>
              {Images.map((image) => (
                <TouchableOpacity key={image} onPress={() => setMainImg(image)}>
                  <Image style={styles.imageIcon} source={{ uri: image }} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <AppText style={styles.heading}>हॉस्पिटलचे नाव :- </AppText>
          <AppText style={styles.textData}>{name}</AppText>
          <AppText style={styles.heading}>हॉस्पिटलचा पत्ता :- </AppText>
          <AppText style={styles.textData}>
            {Address}
          </AppText>
          <AppText style={styles.heading}>हॉस्पिटलचा फोन नंबर :- </AppText>
          <AppText style={styles.textData}>+91 {Contact_No}</AppText>
          <AppText style={styles.heading}>हॉस्पिटलचा ई-मेल ऍड्रेस :- </AppText>
          <AppText style={styles.textData}>{email}</AppText>
        </View>
        <View style={{padding:10}}>
        <Form
        initialValues={
          {
            Patient_Name:'',
            Patient_Contact_No:'',
            Patient_Disease:'',
            Hospital_id:id
          }
        }
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        
        >

            <FormField 
                maxLength={255}
                name="Patient_Name"
                placeholder="रुग्णाचे नाव"
            />
            <FormField 
                 name="Patient_Contact_No"
                 placeholder="रुग्णाचा फोन नंबर"
            />
            <FormField 
                 name="Patient_Disease"
                 placeholder="कोणता आजार"
            />
            <SubmitButton title="हॉस्पिटल कडे पाठवा" />
           
        </Form>
        
        <View style={styles.ButtonContainer}>
        <AppText style={styles.text}>हॉस्पिटल मध्ये कॉल करा - </AppText>
        <IconButton onPress={() => Linking.openURL(`tel:${Contact_No}`)} name="phone" style={{width:150,backgroundColor:'#34a8eb',marginBottom:10}} />
      </View>
        </View>
        
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  imageIcon: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  heading: {
    fontWeight: "bold",
  },
  textData: {
    marginTop: 10,
    marginBottom: 10,
  },
  ButtonContainer:{
    padding:20,
    justifyContent:'center',
    alignItems:"center"
},
text:{
  textAlign:'center',
  textAlignVertical:'center',
  marginBottom:10
}
});
