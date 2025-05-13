import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SlidingImages from './components/Carousel'; // Adjust path as needed

const Gallery = () => {
  // Main slider images
  const mainSliderImages = [
    require('../../assets/images/Gallery/Carousalt1.jpg'),
    require('../../assets/images/Gallery/Carousalt2.jpg'),
    require('../../assets/images/Gallery/Carouselt3.jpg'),
  ];

  // Separate images for each additional row
  const row1Images = [
    require('../../assets/images/Gallery/Food1.jpg'),
    require('../../assets/images/Gallery/Food2.jpg'),
    require('../../assets/images/Gallery/Food3.jpg'),
    require('../../assets/images/Gallery/Food4.jpg'),
    require('../../assets/images/Gallery/Food5.jpg'),
    require('../../assets/images/Gallery/Food6.jpg'),
    require('../../assets/images/Gallery/Food7.jpg'),
    require('../../assets/images/Gallery/Food8.jpg'),
  ];

  const row2Images = [
    require('../../assets/images/Gallery/Drink1.jpg'),
    require('../../assets/images/Gallery/drink2.jpg'),
    require('../../assets/images/Gallery/drink3.jpg'),
    require('../../assets/images/Gallery/drink4.jpg'),
    require('../../assets/images/Gallery/drink5.jpg'),
    require('../../assets/images/Gallery/drink6.jpg'),
    require('../../assets/images/Gallery/drink8.jpg'),
    require('../../assets/images/Gallery/drink7.jpg'),
  ];

  const row3Images = [
    require('../../assets/images/Gallery/Cafe2.jpg'), 
    require('../../assets/images/Gallery/Cafe1.jpg'),
    require('../../assets/images/Gallery/Cafe3.jpg'),
    require('../../assets/images/Gallery/Cafe4.jpg'),
    require('../../assets/images/Gallery/Cafe5.jpg'),
    require('../../assets/images/Gallery/Cafe6.jpg'),
    require('../../assets/images/Gallery/Cafe7.jpg'),
    require('../../assets/images/Gallery/Cafe8.jpg'),
    require('../../assets/images/Gallery/Cafe9.jpg'),
    require('../../assets/images/Gallery/Cafe10.jpg'),
    require('../../assets/images/Aboutimg/about2.png'),
    require('../../assets/images/Gallery/Cafe1.jpg'),
    require('../../assets/images/Aboutimg/about1.png'),
  ];

  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Main Sliding Images */}
        <View className="flex-1 mb-4">
          <SlidingImages images={mainSliderImages} isMainSlider={true} />
        </View>

        {/* Additional Rows of Sliding Images with Separate Images */}
        <View className="mb-4 flex-row">
          <SlidingImages images={row1Images} />
        </View>

        <View className="mb-4 flex-row">
          <SlidingImages images={row2Images} />
        </View>

        <View className="mb-4 flex-row">
          <SlidingImages images={row3Images} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Gallery;