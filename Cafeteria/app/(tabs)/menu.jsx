import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Categories from '../(menudependencies)/Categories'; 
import MenuItems from '../(menudependencies)/menuitems';
import { items } from '../(menudependencies)/menuindex';
import SlidingImages from '../(menudependencies)/slidingimages';
import FilterButtons from '../(menudependencies)/filterbuttons';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation, router } from 'expo-router';

const Menu = () => {
  const scrollViewRef = useRef(null);
  const sectionRefs = items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = React.createRef();
    return acc;
  }, {});


  const scrollToSection = (type) => {
    const sectionRef = sectionRefs[type];
    if (sectionRef?.current) {
      sectionRef.current.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({ y, animated: true });
        }
      );
    }
  };

 
  const uniqueCategories = [...new Set(items.map(item => item.type))];

 
  const [filteredItems, setFilteredItems] = useState(items);
  const [filterApplied, setFilterApplied] = useState(false);

const filterByPrice = () => {
  console.log("Filter by Price clicked");
  if (!filterApplied) {
    const sortedItems = [...items].sort((a, b) => a.price - b.price);
    setFilteredItems(sortedItems);
    setFilterApplied(true);
  } else {
    
    resetFilters();
  }
};

const filterByRating = () => {
  console.log("Filter by Rating clicked");
  if (!filterApplied) {
    const sortedItems = [...items].sort((a, b) => b.rating - a.rating);
    setFilteredItems(sortedItems);
    setFilterApplied(true);
  } else {
   
    resetFilters();
  }
};

const resetFilters = () => {
  console.log("Reset Filters");
  setFilteredItems(items);
  setFilterApplied(false);
};


  const images = [
    require('../(menudependencies)/menuimgs/coffeeroasted(2).jpg'),
    require('../(menudependencies)/menuimgs/burger2.jpg'),
  ];
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView 
        ref={scrollViewRef} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* top arrow */}
        <View className="relative pt-5">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-0 left-0 bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-0 z-30"
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
          <SlidingImages images={images} className="flex-1 mt-10" /> 
        </View>

        <View className="color-main pl-5 fs-5">
          <Text className="color-main text-lg">What's on your mind?</Text>
        </View>
        <Categories scrollToSection={scrollToSection} />

        
        <FilterButtons filterByPrice={filterByPrice} filterByRating={filterByRating} />

      
        {uniqueCategories.map(category => (
          <View className="pl-3" key={category} ref={sectionRefs[category]}>
            <MenuItems items={filteredItems.filter(item => item.type === category)} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;