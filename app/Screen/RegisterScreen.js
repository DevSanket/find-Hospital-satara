import { StyleSheet, Image, ScrollView } from "react-native";
import React,{useState} from "react";
import Screen from "../Components/Screen";
import * as Yup from "yup";
import { Form,FormField,SubmitButton,FormPicker as Picker,FormImagePicker, ErrorMessage} from '../Components/forms';
import colors from "../config/colors";
import Firebase, { createUserProfile } from "../config/firebase";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../Components/ActivityIndicator";


const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  Contact_No: Yup.number().required().min(10).label("Contact No."),
  Address: Yup.string().label("Address"),
  images: Yup.array().min(1, "कृपया एक तरी फोटो निवडा"),
  password: Yup.string().required().min(4).label("Password")
});

export default function Registration() {
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(false);


  const auth = useAuth();

  const HandleSubmit = async ({email,password,name,Contact_No,Address,images}) => {
    try {
      setLoading(true);
      const {user} = await Firebase.auth().createUserWithEmailAndPassword(email,password);
      await createUserProfile(user,images,{name,Contact_No,Address,password});
      auth.logIn(user);
      setLoading(false);
    } catch (error) {
      setError("An unexprected error occured");
      console.log(error);
      setLoading(false);
      return;
    }
  }

  return (
    <>
    <ActivityIndicator  visible={loading}/>
    <Screen style={styles.container}>
      <ScrollView>
        <Image
          style={styles.logo}
          source={require("../assets/logo-hospital.png")}
        />
        <Form
          initialValues={{
            name: "",
            Contact_No: "",
            Address: "",
            images: [],
            email:'',
            password:''
          }}
          onSubmit={HandleSubmit}
          validationSchema={validationSchema}
        >

          <FormImagePicker name="images" />
          <ErrorMessage error={error}/>
          <FormField maxLength={255} name="name" placeholder="तुमचे नाव" />
          <FormField maxLength={255} name="email" placeholder="तुमचा इमेल" />
          <FormField
            keyboardType="numeric"
            maxLength={10}
            name="Contact_No"
            placeholder="तुमचा फोन नंबर"
          />
           <FormField 
            multiline
            name="Address"
            placeholder="तुमचा पत्ता"
            />
             <FormField 
            name="password"
            placeholder="तुमचा पासवर्ड"
            secureTextEntry={true}
            />
            <SubmitButton title="अकाउंट बनवा" />
        </Form>
        </ScrollView>
    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    padding:10,
    backgroundColor:colors.gray
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf:"center"
  },
});
