import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { ShoppingCartIcon, Bars3Icon, MagnifyingGlassIcon } from "react-native-heroicons/solid";
import MapView from "react-native-maps";

const Home = () => {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // Track if menu is open

  return (
    <ImageBackground 
      source={require('../../assets/images/homeimg/home.png')} 
      style={{ flex: 1, resizeMode: 'cover' }} 
    >
      <View className="flex-1">
        {/* Navbar */}
        <View className="w-full flex-row h-[90px] bg-blackk">
          <View className="w-20 items-center justify-center">
            <Image 
              source={require('../../assets/images/homeimg/logo.png')} 
              className="w-[80%] h-[80%] object-cover" 
            />
          </View>
          <View className="flex-row ml-auto my-auto space-x-2">
            {/* <TouchableOpacity>
              <MagnifyingGlassIcon size={35} color="#fff" />
            </TouchableOpacity> */}
            <TouchableOpacity>
              <ShoppingCartIcon size={35} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
              <Bars3Icon size={35} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Line */}
        <View className="bg-gray-400 w-full h-[2px] items-center justify-center" />

        {/* Menu (conditionally rendered) */}
        {isMenuOpen && (
          <View className="absolute top-[90px] right-0 w-[200px] bg-white p-4 rounded-lg shadow-lg z-30">
            <TouchableOpacity 
              onPress={() => { 
                navigation.navigate('Home'); 
                setIsMenuOpen(false);  // Close menu after navigation
              }}
            >
              <Text className="text-black text-lg mb-2">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => { 
                navigation.navigate('gallery'); 
                setIsMenuOpen(false); 
              }}
            >
              <Text className="text-black text-lg mb-2">Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => { 
                navigation.navigate('about'); 
                setIsMenuOpen(false); 
              }}
            >
              <Text className="text-black text-lg mb-2">About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => { 
                navigation.navigate('menu'); 
                setIsMenuOpen(false); 
              }}
            >
              <Text className="text-black text-lg mb-2">Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => { 
                navigation.navigate('blog'); 
                setIsMenuOpen(false); 
              }}
            >
              <Text className="text-black text-lg mb-2">Blogs</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => { 
                navigation.navigate('contact'); 
                setIsMenuOpen(false);  // Close menu after navigation
              }}
            >
              <Text className="text-black text-lg mb-2">Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => { 
                navigation.navigate('profile'); 
                setIsMenuOpen(false);  // Close menu after navigation
              }}
            >
              <Text className="text-black text-lg mb-2">Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Home Image with ScrollView */}
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          showsVerticalScrollIndicator={false}
        >
          <View className="p-4 justify-center z-30">
            {/* Coffee Section */}
            <View className="justify-center items-center mt-[180]">
              <Text className="text-5xl text-center font-bold text-white pb-3">
                Fresh Coffee In The Morning
              </Text>
              <Text className="text-gray-300 text-center pb-5">
                Coffee: Because adulting is hard.{"\n"}
                Life happens, coffee helps.{"\n"}
                Sip, savor, repeat.{"\n"}
                Brewing happiness, one cup at a time.{"\n"}
                Coffee is always a good idea.{"\n"}
                Wake up and smell the coffee.{"\n"}
                Where every cup tells a story{"\n"}
                Espresso yourself..!{"\n"}
                Good days start with coffee.
              </Text>

              {/* Button */}
              <TouchableOpacity
                className="py-3 bg-darkmainn rounded-xl px-[40px] mb-5"
                onPress={() => navigation.navigate('menu')}
              >
                <Text className="text-xl font-bold text-center text-white">Get Yours Now</Text>
              </TouchableOpacity>
            </View>

            {/* Add some spacing before the next section */}
            <View className="mt-[200px]">
              {/* Location Section */}
              <Text className="text-white text-4xl text-center font-u mb-9">Locate Our Cafe</Text>
              <MapView
                style={{ height: 200, width: "100%" }}
                className="mb-4"
              />
            </View>

            {/* Donate section */}
            <View className="mt-[200px] justify-center items-center mb-[150px]">
              <Text className="text-white text-4xl text-center font-u mb-4">Make a Difference Today</Text>

              <Image source={require('../../assets/images/homeimg/donate.jpg')}
                    className="w-[350px] h-[300px]" 
                    resizeMode='contain' />

              {/* Name Input */}
              <TextInput
                className="p-3 bg-gray-100 text-gray-700 rounded-full mb-3 w-[300px]"
                placeholder='Name'
                placeholderTextColor="gray"
              />

              {/* Amount Input */}
              <TextInput
                className="p-3 bg-gray-100 text-gray-700 rounded-full mb-3 w-[300px]"
                placeholder='Amount'
                keyboardType="numeric"
                placeholderTextColor="gray"
              />

              {/* Message Input */}
              <TextInput
                className="p-3 bg-gray-500 text-white rounded-full mb-3 w-[300px]"
                placeholder='Message'
                placeholderTextColor="white"
              />

              {/* Button */}
              <TouchableOpacity
                className="py-3 bg-darkmainn rounded-xl w-[200px] mb-5"
                onPress={() => navigation.navigate('Home')}
              >
                <Text className="text-xl font-bold text-center text-white">Donate</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Home;
