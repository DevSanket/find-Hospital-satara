import { createStackNavigator } from "@react-navigation/stack";
import ForgotPassword from "../Screen/ForgotPassword";
import LoginScreen from "../Screen/LoginScreen";
import Registration from "../Screen/RegisterScreen";

const Stack = createStackNavigator();

export default AuthStack = () => {
   return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={Registration} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
   )
}