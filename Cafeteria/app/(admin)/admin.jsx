import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, router } from 'expo-router';

const Admin = () => {
  const navigation = useNavigation();
  
  return (
    <View className="bg-black w-full h-full flex items-center justify-center">
      {/* Top Left Logout Button */}
      <TouchableOpacity 
        onPress={() => router.replace('/')}
        className="absolute top-4 left-4 bg-main p-2 rounded-tr-2xl rounded-bl-2xl">
        <Text className="text-white font-bold">Log Out</Text>
      </TouchableOpacity>
      
      <Text className="text-white text-3xl font-bold">Admin</Text>
      <View className="p-6 mt-[10px]">
        {/* First Row */}
        <View className="flex flex-row justify-between mb-6">
          <View className="bg-slate-500 w-[150px] h-[150px] mr-4 items-center justify-center">
            <TouchableOpacity 
              onPress={() => navigation.navigate('orders')}>
              <View className="z-10 flex items-center justify-center">
                <Image 
                  source={require('../../assets/images/adminn/order.jpg')} 
                  className="w-[80%] h-[80%]"
                  style={{ resizeMode: 'contain' }} 
                />
              </View>
              <Text className="text-black text-lg font-medium">Orders</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-slate-500 w-[150px] h-[150px] mr-4 items-center justify-center">
            <TouchableOpacity 
              onPress={() => navigation.navigate('items')}>
              <View className="z-10 flex items-center justify-center">
                <Image 
                  source={require('../../assets/images/adminn/items.jpg')} 
                  className="w-[80%] h-[80%]"
                  style={{ resizeMode: 'contain' }} 
                />
              </View>
              <Text className="text-black text-lg font-medium">Items</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Second Row */}
        <View className="flex flex-row justify-between">
          <View className="bg-slate-500 w-[150px] h-[150px] mr-4 items-center justify-center">
            <TouchableOpacity 
              onPress={() => navigation.navigate('reviews')}>
              <View className="z-10 flex items-center justify-center">
                <Image 
                  source={require('../../assets/images/adminn/review.jpg')} 
                  className="w-[80%] h-[80%]"
                  style={{ resizeMode: 'contain' }} 
                />
              </View>
              <Text className="text-black text-lg font-medium">Reviews</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-slate-500 w-[150px] h-[150px] mr-4 items-center justify-center">
            <TouchableOpacity 
              onPress={() => navigation.navigate('settings')}>
              <View className="z-10 flex items-center justify-center">
                <Image 
                  source={require('../../assets/images/adminn/setting.jpg')} 
                  className="w-[80%] h-[80%]"
                  style={{ resizeMode: 'contain' }} 
                />
              </View>
              <Text className="text-black text-lg font-medium">Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Admin;
