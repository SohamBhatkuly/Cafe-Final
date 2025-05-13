import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation, router } from 'expo-router';

const settings = () => {
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
    </View>
  )
}

export default settings
