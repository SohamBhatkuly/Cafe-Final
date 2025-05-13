import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useCreatePaymentIntentMutation } from './components/apiSlice';
import { useStripe } from '@stripe/stripe-react-native'

const Payment = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [paymentMode, setPaymentMode] = useState('');
  const [address, setAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [amount, setAmount] = useState(0); // This will be updated via useEffect
  const userId = 'USER12345'; // Set dynamically if possible
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const onCheckout = async () => {
    // Create Payment Intent
    const response = await createPaymentIntent({
      amount: Math.floor(amount * 100), // Amount in cents for Stripe
    });

    if (response.error) {
      Alert.alert('Something went wrong');
      return;
    }

    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'kafe',
      paymentIntentClientSecret: response.data.paymentIntent,
    });

    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }

    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(`Error code: ${paymentResponse.error.code}`, paymentResponse.error.message);
      return;
    }

    // Store payment details in the backend
    try {
      const paymentResponse = await fetch('http://192.168.0.106:5001/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId, 
          amount: parseFloat(amount), 
        //   paymentMode, 
          address, 
        }),
      });

      const paymentData = await paymentResponse.json();

      if (paymentResponse.ok) {
        Alert.alert('Payment successful!', 'Thank you for your purchase!');
      } else {
        Alert.alert('Failed to save payment', paymentData.error || 'An error occurred');
      }

    } catch (error) {
      Alert.alert('Network error', 'Could not save payment details');
    }

    // Reset input fields after a successful payment
    setAmount(0);
    setAddress('');
    setPaymentMode('');
  };

  const getCartItems = async (userId) => {
    try {
      const response = await axios.get(`http://192.168.0.106:5001/cart/${userId}`);

      if (response.status === 200) {
        setCartItems(response.data.data);
      }
    } catch (error) {
      Alert.alert('Error fetching cart items:', 'Network error. Please try again later.');
    }
  };

  useEffect(() => {
    getCartItems(userId);
  }, [userId]);

  // Calculate total bill when cart items change
  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((total, item) => {
        return total + (item.itemPrice * item.itemQuantity);
      }, 0).toFixed(2);

      setAmount(total); // Update the amount state
    }
  }, [cartItems]);

  const handleSubmit = () => {
    if (!paymentMode || !address) {
      Alert.alert('Error', 'Please select a payment mode and enter your address.');
    } else {
      onCheckout(); // Proceed to checkout
    }
  };

  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="relative pt-5">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-0 left-0 bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-0 z-30"
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Cart Items Display */}
        <View className="px-4 mt-6 mb-4">
          <Text className="text-white text-lg font-bold mb-1">Cart Items:</Text>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <Text key={index} className="text-white">
                {item.itemName} - ₹{item.itemPrice !== undefined ? item.itemPrice.toFixed(2) : 'N/A'} {' '} ({item.itemQuantity})
              </Text>
            ))
          ) : (
            <Text className="text-white">No items in the cart.</Text>
          )}

          {cartItems.length > 0 && (
            <Text className="text-white text-lg font-bold mt-4">
              Total Bill: ₹{amount}
            </Text>
          )}
        </View>

        {/* Address Input */}
        <View className="flex-row justify-between items-center w-full mx-auto mb-2 px-4 py-4 mt-6">
        <Text className="text-white text-lg font-bold mb-1">Enter your address:</Text>
            <TextInput
                className="h-10 border border-gray-400 rounded-md p-2 text-white"
                placeholder="Your address"
                placeholderTextColor="#999"
                value={address}
                onChangeText={setAddress}
            />
        </View>


        {/* Payment Mode */}
        <View className="flex-row justify-between items-center w-[80%] mb-2 px-4 py-4 mt-6 bg-white rounded-lg">
  <Text className="text-black text-lg font-bold mb-1">Select Payment Mode:</Text>
  
  <RNPickerSelect
    onValueChange={(value) => setPaymentMode(value)}
    items={[
      { label: 'Credit Card', value: 'Credit Card' },
      { label: 'Debit Card', value: 'Debit Card' },
      { label: 'UPI', value: 'UPI' },
      { label: 'Net Banking', value: 'Net Banking' },
    ]}
    style={{
      inputAndroid: {
        color: 'black', // Set text color for Android picker
        backgroundColor: '#f3f4f6', // Equivalent to Tailwind's bg-gray-100
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#FFFFF', // Tailwind's border-gray-200
        borderRadius: 8,
      },
      placeholder: {
        color: 'white', // Placeholder text color (gray-400)
      },
    }}
    placeholder={{ label: 'Select payment mode', value: null }}
  />
</View>


        {/* Submit Button */}
        <View className="justify-start px-4">
          <TouchableOpacity 
            className="bg-main p-2 rounded items-center w-1/2"
            onPress={onCheckout}
          >
            <Text className="text-black text-xl font-bold">Pay Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
