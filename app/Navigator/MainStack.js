import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screen/HomeScreen";
import HospitalDetails from "../Screen/HospitalDetails";

const Stack = createStackNavigator();

export default MainStack = () => {
   return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Hospital_Details" component={HospitalDetails} />
    </Stack.Navigator>
   )
}