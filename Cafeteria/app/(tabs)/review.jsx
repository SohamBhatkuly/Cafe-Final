import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useRouter } from 'expo-router';
import { StarIcon } from 'react-native-heroicons/solid'; // Make sure to use the correct star icon

const Review = () => {
  const router = useRouter();

//   const reviews = [
//     { id: 1, name: 'John Doe', rating: 4 },
//     { id: 2, name: 'Jane Smith', rating: 3.5 },
//     { id: 3, name: 'Robert Johnson', rating: 3 },
//   ];

    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);


  return (
    <View className="bg-blackk w-full h-full">
      {/* Top Section with Arrow and Rating */}
      <View className="flex-row justify-start mt-4 ml-4">
        <TouchableOpacity onPress={() => router.back()}
          className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl">
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Overall Rating */}
      <View className="items-center mt-6">
        <Text className="text-white text-5xl font-bold">4.0</Text>
        <View className="flex-row mt-2">
          {/* Display the stars (5 stars, partially filled) */}
          {[...Array(4)].map((_, index) => (
            <StarIcon key={index} size={24} color="#d3ad7f" />
          ))}
          <StarIcon size={24} color="gray" />
        </View>
      </View>

      {/* Reviews Title */}
      <View className="ml-6 mt-6">
        <Text className="text-white text-xl font-bold underline">Reviews</Text>
      </View>

      {/* List of Reviews */}
      <ScrollView className="mt-4">
        {reviews.map((review) => (
          <View key={review.id} className="flex-row items-center mx-6 mt-4">
            {/* User Image */}
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual user image
              className="h-12 w-12 rounded-full"
            />

            {/* Review Details */}
            <View className="ml-4 flex-1">
              <Text className="text-white">{review.name}</Text>
              <View className="flex-row">
                {/* Display the rating stars */}
                {[...Array(Math.floor(review.rating))].map((_, index) => (
                  <StarIcon key={index} size={20} color="#d3ad7f" />
                ))}
                {/* Half star if necessary */}
                {review.rating % 1 !== 0 && <StarIcon size={20} color="gray" />}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add Review Button */}
      <View className="absolute bottom-6 w-full px-20">
        <TouchableOpacity
          className="py-3 bg-main rounded-3xl px-[20px]"
          onPress={() => router.push('/addreview')}
        >
          <Text className="text-center text-xl font-bold text-white">Add Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Review;
