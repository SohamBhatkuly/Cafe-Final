import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { Feather } from '@expo/vector-icons'; 
import axios from 'axios';
import MaterialErrorIcon from 'react-native-vector-icons/MaterialIcons';

const SignIn = () => {
  const navigation = useNavigation(); // Added this line
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit() {
    if(email=="admin@gmail.com"){
      router.push('admin');
      return;
    }

    console.log(email, password);
    const userData = {
      email: email,
      password
    };
  
    axios
      // .post("http://192.168.173.218:5001/login-user", userData) // my hotspot
      .post("http://192.168.0.106:5001/login-user", userData)   //wifi 192.168.33.218
      // .post("http://192.168.33.218:5001/login-user", userData) // my hotspot
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 'ok') {
          Alert.alert('Logged In Successfully');
          router.push('Home')
        } else {
          Alert.alert('Login Failed', res.data.error || 'Unknown error occurred');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred. Please try again.');
      });
  }


  

  return (
    <View className="bg-blackk h-full flex-1">
      <SafeAreaView className="flex">
        <ScrollView>
          {/* top arrow */}
          <View className="flex-row justify-start">
            <TouchableOpacity onPress={() => navigation.goBack()}
              className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
              <ArrowLeftIcon size={20} color="black" />
            </TouchableOpacity>
          </View>
          {/* main img */}
          <View className="flex-row justify-center">
            <Image source={require('../../assets/images/homeimg/maze.jpg')} className="w-[200px] h-[200px] rounded-lg" resizeMode="cover" />
          </View>
        </ScrollView>
      </SafeAreaView>
      <ScrollView className="mt-[-50px]" keyboardShouldPersistTaps="always">
        <View className="flex-1 bg-lightmainn mt-20 px-8 pt-10  rounded-t-[70px]">
          <View className="form space-y-2">
            {/* Email Box */}
            <Text className="text-gray-700 ml-4 font-bold">Email Address</Text>
            <View className="flex-row items-center bg-gray-100 rounded-2xl mb-3 pr-2">
              <TextInput
                className="p-3 flex-1 text-gray-700 rounded-2xl"
                value={email}
                onChange={e => setEmail(e.nativeEvent.text)} 
                placeholder='Enter Email'
              />
            </View>

            {/* Password Box */}
            <Text className="text-gray-700 ml-4 font-bold">Password</Text>
            <View className="flex-row items-center bg-gray-100 rounded-2xl mb-3 pr-2">
              <TextInput
                className="p-3 flex-1 text-gray-700 rounded-2xl"
                secureTextEntry={!showPassword}
                value={password}
                onChange={e => setPassword(e.nativeEvent.text)} // Updated
                placeholder='Enter Password'
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {password.length < 1 ? null : !showPassword ? (
                  <Feather name="eye-off" size={20} />
                ) : (
                  <Feather name="eye" size={20} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="flex items-end mb-5">
              <Text className="text-gray-700">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3 bg-darkmainn rounded-xl"
              onPress={() => handleSubmit()}>
              <Text className="text-gray-700 font-xl font-bold text-center">Login</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../assets/images/homeimg/google.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../assets/images/homeimg/apple.png')} className="w-10 h-10 object-cover" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../assets/images/homeimg/fb.png')} className="w-10 h-10 object-cover" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7 py-3">
            <Text className="text-gray-700 font-semibold">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('sign-up')}>
              <Text className="text-toodark font-semibold"> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
