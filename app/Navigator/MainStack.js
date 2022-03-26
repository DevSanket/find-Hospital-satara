import { createStackNavigator } from "@react-navigation/stack";
import AppointmentHistory from "../Screen/AppointmentHistory";
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
    </Stack.Navigator>
   )
}