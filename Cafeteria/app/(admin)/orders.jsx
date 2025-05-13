import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar'; 

const orders = () => {
  const navigation = useNavigation();
  const orders = [
    { id: 1, delivered: true },
    { id: 2, delivered: false },
    { id: 3, delivered: true },
  ];
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
        <StatusBar style="light" />
        <Text className="text-white text-2xl font-bold mb-4">Customer Orders</Text>
        <ScrollView>
            {orders.map((order) => (
            <View key={order.id} className="flex-row items-center justify-between mb-4 bg-gray-800 p-4 rounded-lg">
                <Image
                source={{ uri: 'https://via.placeholder.com/40' }} 
                className="w-10 h-10 rounded-full"
                />
                <View className="flex-1 mx-2">
                <View className="bg-gray-600 h-2 rounded-full w-full" />
                </View>
                <Text className="text-white">
                    {order.delivered ? (
                        <Text className="ml-2 text-green-500">Delivered ●</Text>
                    ) : (
                        <Text className="ml-2 text-red-500">Not Delivered ●</Text>
                    )}
                </Text>
            </View>
            ))}
        </ScrollView>
        </View>

    </View>
  )
}

export default orders
