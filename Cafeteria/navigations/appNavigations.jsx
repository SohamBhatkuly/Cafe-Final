import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../app/(tabs)/Home'
import LoginScreen from '../app/(auth)/sign-in'
import SignUpScreen from '../app/(auth)/sign-up'
import useAuth from '../hooks/useAuth'
import { Stack } from "expo-router";

export default function AppNavigations() {
    // const {user} = useAuth();
    // if(user){
        return(
            <NavigationContainer initialRouteName="Home">
                <Stack.Navigator>
                    <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    // }else{
    //     return(
    //         <NavigationContainer initialRouteName="Welcome">
    //             <Stack.Navigator>
    //                 <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen}/>
    //                 <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen}/>
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     )
    // }
}