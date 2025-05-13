import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { ArrowLeftIcon, CheckIcon, XIcon } from 'react-native-heroicons/solid';
import { useNavigation, router } from 'expo-router';

const items = () => {
    const navigation = useNavigation();
  return (
    <View className="bg-blackk w-full h-full">
        {/* top arrow */}
        <View className="flex-row justify-start mt-[10px]">
            <TouchableOpacity onPress={() => navigation.goBack()}
              className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
              <ArrowLeftIcon size={20} color="black" />
            </TouchableOpacity>
        </View>

        <View className="flex-1 bg-blackk p-4">
        {/* User Image and Coffee Image */}
        <View className="flex-row justify-between mb-4">
            <Image
            source={require('../../assets/images/homeimg/beans.jpg')} 
            className="w-10 h-10 rounded-full"
            />
            <Image
            source={require('../../assets/images/homeimg/beans.jpg')} 
            className="w-20 h-20 rounded-lg"
            />
        </View>

        {/* Payment Method */}
        <Text className="text-white mb-2">Payment Method</Text>
        <View className="flex-row items-center justify-between mb-4">
            <Text className="bg-white text-blackk px-4 py-2 rounded-lg">Pay-on Delivery</Text>
            <View className="flex-row items-center">
            <TouchableOpacity className="mr-2">
                <ArrowLeftIcon size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity>
                <ArrowLeftIcon size={24} color="green" />
            </TouchableOpacity>
            </View>
        </View>

        {/* Address Input */}
        <Text className="text-white mb-2">Address</Text>
        <TextInput
            className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-4"
            placeholder="Enter your address"
            placeholderTextColor="gray"
        />

        {/* Total Cost */}
        <Text className="text-white font-bold">Total Cost: 750/-</Text>
        </View>
    </View>
  )
}

export default items
