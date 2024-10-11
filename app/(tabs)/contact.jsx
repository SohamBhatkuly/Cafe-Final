import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const Payment = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  
  // State for payment mode and address
  const [paymentMode, setPaymentMode] = useState('');
  const [address, setAddress] = useState('');
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const userId = 'USER12345'; // Set your user ID here

  // Function to fetch cart items
  const getCartItems = async (userId) => {
    try {
      const response = await axios.get(`http://192.168.45.238:5001/cart/${userId}`);
      
      if (response.status === 200) {
        console.log('Cart items:', response.data.data); // Log the cart items
        setCartItems(response.data.data); // Set cart items to state
      }
    } catch (error) {
      if (error.response) {
        console.error('Error fetching cart items:', error.response.data);
        Alert.alert('Error fetching cart items:', error.response.data.message || 'An error occurred.');
      } else {
        console.error('Error fetching cart items:', error.message);
        Alert.alert('Error fetching cart items:', 'Network error. Please try again later.');
      }
    }
  };

  // Fetch cart items when the component mounts
  useEffect(() => {
    getCartItems(userId);
  }, [userId]);

  const handleSubmit = () => {
    if (!paymentMode || !address) {
      Alert.alert('Error', 'Please select a payment mode and enter your address.');
    } else {
      Alert.alert('Success', `Payment Mode: ${paymentMode}\nAddress: ${address}`); // Use backticks for string interpolation
      // You can proceed with your submission logic here
    }
  };
  const calculateTotalBill = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.itemPrice * item.itemQuantity);
    }, 0).toFixed(2); // Use toFixed to format to 2 decimal places
  };

  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView 
        ref={scrollViewRef} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Top Arrow */}
        <View className="relative pt-5">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-0 left-0 bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-0 z-30"
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Display Cart Items */}
        <View className="px-4 mt-6 mb-4">
          <Text className="text-white text-lg font-bold mb-1">Cart Items:</Text>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <Text key={index} className="text-white">
                {item.itemName} - ₹{item.itemPrice !== undefined ? item.itemPrice.toFixed(2): 'N/A'}
              {' '} ({item.itemQuantity})
              </Text>
            ))
          ) : (
            <Text className="text-white">No items in the cart.</Text>
          )}

                {cartItems.length > 0 && (
            <Text className="text-white text-lg font-bold mt-4">
              Total Bill: ₹{calculateTotalBill()}
            </Text>
          )}
          
        </View>

        {/* Address Input */}
        <View className="flex-row justify-between items-center w-full mx-auto mb-2 px-4 py-4 mt-6">
          <Text className="text-white text-lg font-bold mb-1">Enter your address:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10 }}
            placeholder="Your address"
            placeholderTextColor="#999"
            value={address}
            onChangeText={setAddress}
          />
        </View>
    
        {/* Submit Button */}
        <View className="justify-start px-4">
          <TouchableOpacity 
            className="bg-main p-2 rounded items-center w-1/2"
            onPress={handleSubmit} // Call handleSubmit on press
          >
            <Text className="text-white font-bold text-sm">Submit</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
