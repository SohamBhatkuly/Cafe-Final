import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { categories } from './menuindex';

const Categories = ({ scrollToSection }) => {
  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((category) => (
          <View key={category.id} className="flex justify-center items-center mr-6">
            <TouchableOpacity
              className="w-20 h-20 rounded-full overflow-hidden bg-gray-200"
              onPress={() => scrollToSection(category.name)}
            >
              <Image
                source={category.image}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text className="mt-2 text-center text-white">
              {category.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;