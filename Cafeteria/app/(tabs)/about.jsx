import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { classNames } from 'nativewind';

// Main component
export default function KafeKoffeeKnight() {
  return (
    <View className="flex-1 bg-black">
      {/* Header with Back Button and Logo */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity className="p-2">
          {/* Add your back button icon here */}
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Image
            source={require('../../assets/images/icon.png')}
            className="w-20 h-20 rounded-lg bg-black"
            resizeMode="contain"
            accessibilityLabel="My Icon"
          />
          <Text className="text-white text-3xl font-bold mt-2">
            Kafe Koffee Knight
          </Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView className="px-4">
        {/* First Image and Text */}
        <View className="flex-row items-center mb-6 justify-between">
          <Image
            source={require('../../assets/images/Aboutimg/about1.png')}
            className="w-2/4 h-40 rounded-lg mr-4" // Left Image
          />
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">OUR WHY</Text>
            <Text className="text-gray-400 text-lg mt-2">
              At Kafe Koffee Knight, we believe that coffee is more than just a beverage; 
              it's a way to connect, share, and create memories. Our passion for coffee started with a simple mission: 
              to bring people together over a cup of the finest brews.
            </Text>
          </View>
        </View>

        {/* Second Image and Text with Right Alignment */}
        <View className="flex-row items-center mb-6 justify-between">
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">WHY US</Text>
            <Text className="text-gray-400 text-lg mt-2">
              Choosing Kafe Koffee Knight means supporting a local business that prioritizes quality and connection. 
              We pride ourselves on our cozy atmosphere, where every customer is treated like family. 
            </Text>
          </View>
          <Image
            source={require('../../assets/images/Aboutimg/about2.png')}
            className="w-1/2 h-40 rounded-lg ml-4" // Right Image
          />
        </View>

        {/* Third Image and Text */}
        <View className="flex-row items-center mb-6 justify-between">
          <Image
            source={require('../../assets/images/Aboutimg/about3.png')}
            className="w-1/2 h-40 rounded-lg mr-4" // Left Image
          />
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">HOW WE HELP</Text>
            <Text className="text-gray-400 text-lg mt-2">
              We are committed to making a positive impact in our community and the environment. 
              By sourcing our coffee from fair-trade farms, we ensure that farmers receive fair wages and work in safe conditions.
            </Text>
          </View>
        </View>

        {/* Testimonials */}
        <View className="mb-6">
          <Text className="text-white text-2xl font-bold">TESTIMONIALS</Text>
          <Text className="text-gray-400 text-lg mt-4">
            "The moment I walked into Kafe Koffee, I felt at home. The ambiance is perfect!"
            — Angad Sawkar
          </Text>
          <Text className="text-gray-400 text-lg mt-4">
            "I love Kafe Koffee. Their coffee is great, and the atmosphere is chill."
            — Ervin D'costa
          </Text>
          <Text className="text-gray-400 text-lg mt-4">
            "I love going to Kafe Koffee. Their coffee is amazing, and the atmosphere is really relaxing. The staff is always friendly too."
            — Avin Kapolkar
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}