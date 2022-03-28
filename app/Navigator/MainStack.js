import { createStackNavigator } from "@react-navigation/stack";
import AboutUs from "../Screen/AboutUs";
import AppointmentHistory from "../Screen/AppointmentHistory";
import DeleteorUpdate from "../Screen/DeleteorUpdate";
import HomeScreen from "../Screen/HomeScreen";
import HospitalDetails from "../Screen/HospitalDetails";
import ProfileScreen from "../Screen/ProfileScreen";
import RunningAppointments from "../Screen/RunningAppointments";

const Stack = createStackNavigator();

export default MainStack = () => {
   return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Hospital_Details" component={HospitalDetails} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="RunningAppointments" component={RunningAppointments} />
        <Stack.Screen name="AppointMentHistory" component={AppointmentHistory} />
        <Stack.Screen name="Aboutus" component={AboutUs} />
        <Stack.Screen name="DeleteorUpdate" component={DeleteorUpdate} />
    </Stack.Navigator>
   )
}