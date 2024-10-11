import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons'; // Icon library
import { styled } from 'nativewind'; // Import NativeWind
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation, router } from 'expo-router'

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const uploadImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access camera is required!");
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setModalVisible(false);
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
      setModalVisible(false);
    }
  };

  const chooseFromGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access gallery is required!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setModalVisible(false);
      }
    } catch (error) {
      alert("Error selecting image: " + error.message);
      setModalVisible(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setModalVisible(false);
  };

  return (
    <StyledView className="flex-1 bg-blackk p-4">
      {/* Back Button */}
      <View className="flex-row justify-start">
        <TouchableOpacity onPress={() => navigation.goBack()}
          className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
          <ArrowLeftIcon size={20} color="black"/>
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <StyledView className="justify-center items-center mt-6">
        <StyledView className="w-40 h-40 bg-gray-800 rounded-full justify-center items-center relative border-4 border-[#D2A86E]">
          <StyledImage
            source={image ? { uri: image } : require('../../assets/images/Profileimg/pfp.png')}
            className="w-32 h-32 rounded-full"
          />
          <StyledTouchableOpacity
            className="absolute bg-white p-2 rounded-full bottom-0 right-0 border border-black"
            onPress={() => setModalVisible(true)}
          >
            <Feather name="camera" size={20} color="black" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>

      {/* Input Fields */}
      <StyledView className="mt-6">
        {/* Name Field */}
        <StyledView className="flex-row items-center bg-[#D2A86E] rounded-full p-4 mb-4">
          <StyledText className="text-black flex-1">Name</StyledText>
          <StyledTextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#555"
            className="text-black flex-1"
          />
          {/* <Feather name="edit-2" size={20} color="black" /> */}
        </StyledView>

        {/* Username Field */}
        <StyledView className="flex-row items-center bg-[#D2A86E] rounded-full p-4 mb-4">
          <StyledText className="text-black flex-1">Username</StyledText>
          <StyledTextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            placeholderTextColor="#555"
            className="text-black flex-1"
          />
          {/* <Feather name="edit-2" size={20} color="black" /> */}
        </StyledView>

        {/* Email Field */}
        <StyledView className="flex-row items-center bg-[#D2A86E] rounded-full p-4 mb-4">
          <StyledText className="text-black flex-1">Email</StyledText>
          <StyledTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#555"
            keyboardType="email-address"
            className="text-black flex-1"
          />
          {/* <Feather name="edit-2" size={20} color="black" /> */}
        </StyledView>

        {/* Phone No Field */}
        <StyledView className="flex-row items-center bg-[#D2A86E] rounded-full p-4 mb-4">
          <StyledText className="text-black flex-1">Phone No.</StyledText>
          <StyledTextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor="#555"
            keyboardType="phone-pad"
            className="text-black flex-1"
          />
          {/* <Feather name="edit-2" size={20} color="black" /> */}
        </StyledView>
      </StyledView>

      {/* Modal for Image Upload */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <StyledView className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <StyledView className="bg-white p-4 rounded-lg w-3/4">
            <StyledText className="text-black mb-4">Upload Profile Picture</StyledText>
            <StyledTouchableOpacity className="bg-[#D2A86E] p-2 rounded-lg mb-2" onPress={uploadImage}>
              <StyledText className="text-black text-center">Take Photo</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="bg-[#D2A86E] p-2 rounded-lg mb-2" onPress={chooseFromGallery}>
              <StyledText className="text-black text-center">Choose from Gallery</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="bg-red-400 p-2 rounded-lg mb-2" onPress={removeImage}>
              <StyledText className="text-black text-center">Remove Photo</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              className="bg-gray-300 p-2 rounded-lg"
              onPress={() => setModalVisible(false)}
            >
              <StyledText className="text-black text-center">Cancel</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </Modal>
    </StyledView>
  );
};

export default ProfileScreen;