//welcome page
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'

const logo = require("../assets/images/homeimg/logo.png")
const home = require("../assets/images/homeimg/home2.jpg")
const stroke = require("../assets/images/homeimg/stroke.png")

export default function App() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-blackk h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full h-[90vh] justify-center items-center px-4">
          <View className="flex-row items-center">
            <Image
              source={logo} className="w-20 h-20" resizeMode="contain"
            /> 
            <Text className="text-main text-2xl mt-2">Kafe</Text>
          </View>

          <Image
            source={home} className="max-w-[380px] w-full h-[300px]" resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              Discover Various Coffee Types with {' '}
              <Text className="text-main">Kafe Koffee Knight</Text>
            </Text>
          </View>

          <Image
            source={stroke}
            className="w-[250px] h-[30px] relative -bottom-[-15] -right-6"
            resizeMode='stretch'
          />

          <Text className="text-sm font-pregular text-gray-400 mt-7 text-center">
          Fuel your day with ease. Order your food online, skip the queue, and enjoy your meal wherever you like.
          </Text>

          <CustomButton
            title="Sign-up"
            handlePress={()=>router.push('/sign-up')}
            containerStyles={"w-full mt-7"}
          />

          <View className="flex-row justify-center py-2">
            <Text className="text-gray-300 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('sign-in')}>
                <Text className="text-main font-semibold"> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style='light'/>
    </SafeAreaView>
  );
}