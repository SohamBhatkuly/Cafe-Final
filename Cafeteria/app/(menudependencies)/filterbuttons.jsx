import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const FilterButtons = ({ filterByPrice, filterByRating }) => {
  const [pressedButton, setPressedButton] = useState(null);

  return (
    <View className="flex-row justify-around my-3">
      <Pressable
        onPress={() => {
          filterByPrice();
          setPressedButton('price');
        }}
        onPressIn={() => setPressedButton('price')}
        onPressOut={() => setPressedButton(null)}
        className={`flex-row items-center py-3 px-5 rounded-full ${
          pressedButton === 'price' ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        <FontAwesome name="sliders" size={20} color="black" className="mr-2" />
        <Text className="text-blackk text-center">Filter by Price</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          filterByRating();
          setPressedButton('rating');
        }}
        onPressIn={() => setPressedButton('rating')}
        onPressOut={() => setPressedButton(null)}
        className={`flex-row items-center py-3 px-5 rounded-full ${
          pressedButton === 'rating' ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        <FontAwesome name="sliders" size={20} color="black" className="mr-2" />
        <Text className="text-blackk text-center"> Filter by Rating</Text>
      </Pressable>
    </View>
  );
};

export default FilterButtons;