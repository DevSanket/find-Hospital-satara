import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screen/LoginScreen";

const Stack = createStackNavigator();

export default AuthStack = () => {
   return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
   )
}