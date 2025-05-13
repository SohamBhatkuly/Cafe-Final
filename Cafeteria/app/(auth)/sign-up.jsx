import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import  CustomButton  from '../../components/CustomButton'
import { createUser } from '../../api/user'
import { Feather } from '@expo/vector-icons' 
import axios from 'axios';
import Error from 'react-native-vector-icons/MaterialIcons';

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault(); 

    if (!nameVerify || !emailVerify || !passwordVerify) {
      alert('Please make sure all fields are valid.');
      return; 
    }

    const userData = {
      name, 
      email,
      password,
    };

    axios
      // .post("http://192.168.173.218:5001/register", userData) // my hotspot
      .post("http://192.168.0.106:5001/register", userData)   //wifi
      // .post("http://192.168.33.218:5001/register", userData) // my hotspot
      .then((res) => {
        console.log('Response:', res.data);
        Alert.alert('Signed In Successfully');
        router.push('Home')
      })
      .catch(err => {
        if (err.response && err.response.status === 'ok') {
          // Assuming a 409 status means the user already exists
          alert('User already exists. Please use a different email.');
        } else {
          console.log('Error:', err.response ? err.response.data : err.message);
          alert('User Already Exists!!.');
        }
      });
  }

  function handleName(e){
    e.persist();
    const nameVar= e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);
    if(nameVar.length > 1){
      setNameVerify(true);
    }
  }

  function handleEmail(e){
    e.persist();
    const emailVar= e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)){
      setEmailVerify(true);
    }
  }

  function handlePassword(e){
    e.persist();
    const passwordVar= e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)){
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }

  return (
    <View className="bg-blackk h-full flex-1">
      <SafeAreaView className="flex">
        <ScrollView>
          {/* top arrow */}
          <View className="flex-row justify-start">
            <TouchableOpacity onPress={() => navigation.goBack()}
              className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
              <ArrowLeftIcon size={20} color="black"/>
            </TouchableOpacity>
          </View>

          {/* main img */}
          <View className="flex-row justify-center">
          <Image source={require('../../assets/images/homeimg/clock.jpg')} className="w-[200px] h-[200px] rounded-full object-cover"/>
          </View>
        </ScrollView>
      </SafeAreaView>
      
      <ScrollView className="mt-[-50px]" keyboardShouldPersistTaps="always">
        <View className="flex-1 bg-lightmainn mt-20 px-8 pt-10  rounded-t-[70px]">
            <View className="form space-y-2">
              {/* Name Box */}
              <Text className="text-gray-700 ml-4 font-bold">Full Name</Text>
              <View className="flex-row items-center bg-gray-100 rounded-2xl mb-3 pr-2">
                <TextInput
                  className="p-3 flex-1 text-gray-700 rounded-2xl"
                  value={name}
                  onChange={e => handleName(e)} 
                  placeholder='Enter Name'
                />
                
                {name.length<1 ? null : nameVerify ? (
                  <Feather name = "check-circle" color="green" size={20}/>
                ): (
                  <Error name="error-outline" color="red" size={20}/>
                )}
              </View>
                {name.length<1 ? null : nameVerify ? null : (
                    <Text className="text-red-500 pb-2">Name should be more than 1 character</Text>
                )}

              {/* Email Box */}
              <Text className="text-gray-700 ml-4 font-bold">Email Address</Text>
              <View className="flex-row items-center bg-gray-100 rounded-2xl mb-3 pr-2">
                <TextInput
                  className="p-3 flex-1 text-gray-700 rounded-2xl "
                  value={email}
                  onChange={e => handleEmail(e)}
                  placeholder='Enter Email'
                />
                {email.length<1 ? null : emailVerify ? (
                  <Feather name = "check-circle" color="green" size={20}/>
                ): (
                  <Error name="error-outline" color="red" size={20}/>
                )}
              </View>
                {email.length<1 ? null : emailVerify ? null : (
                    <Text className="text-red-500 pb-2">Put proper email</Text>
                )}

              {/* Password Box */}
              <Text className="text-gray-700 ml-4 font-bold">Password</Text>
              <View className="flex-row items-center bg-gray-100 rounded-2xl mb-3 pr-2">
                <TextInput
                  className="p-3 flex-1 text-gray-700 rounded-2xl"
                  secureTextEntry={showPassword}
                  value={password}
                  onChange={e => handlePassword(e)}
                  placeholder='Enter Password'
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {password.length<1 ? null :  !showPassword ? (
                    <Feather
                      name="eye-off"
                      size={20}
                    />
                  ):(
                    <Feather name="eye"
                    size={20}
                    />
                  )}
                </TouchableOpacity>
              </View>
                {password.length<1 ? null : passwordVerify ? null : (
                    <Text className="text-red-500 pb-2">Uppercae, Lowercase, Number and 6 or more characters.</Text>
                )}
              <TouchableOpacity className="py-3 bg-darkmainn rounded-xl top-3"
                onPress={(e) => handleSubmit(e)}
              >
                <Text className="text-gray-700 font-xl font-bold text-center">Sign Up</Text>
              </TouchableOpacity>
    
            </View>

            <Text className="text-xl text-gray-700 font-bold text-center py-6 top-1">Or</Text>
            <View className="flex-row justify-center space-x-12">
              <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../../assets/images/homeimg/google.png')} className="w-10 h-10"/>
              </TouchableOpacity>
              <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../../assets/images/homeimg/apple.png')} className="w-10 h-10 object-cover"/>
              </TouchableOpacity>
              <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../../assets/images/homeimg/fb.png')} className="w-10 h-10 object-cover"/>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-7 pb-6">
              <Text className="text-gray-700 font-semibold">Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push('sign-in')}>
                  <Text className="text-toodark font-semibold"> Login</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default SignUp