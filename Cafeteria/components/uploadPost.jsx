import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const UploadPost = ({ onUpload }) => {
  const [username, setUsername] = useState('');
  const [postImage, setPostImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [date, setDate] = useState('');
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  const handleUpload = () => {
    onUpload({ username, postImage, profileImage, date, likes, comments });
  };

  return (
    <View className="bg-blackk flex-1 p-4">
      <Text className="text-white text-xl mb-4">Upload New Post</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="gray"
        className="bg-gray-700 p-2 rounded-lg text-white mb-2"
      />
      <TextInput
        value={postImage}
        onChangeText={setPostImage}
        placeholder="Post Image URL"
        placeholderTextColor="gray"
        className="bg-gray-700 p-2 rounded-lg text-white mb-2"
      />
      <TextInput
        value={profileImage}
        onChangeText={setProfileImage}
        placeholder="Profile Image URL"
        placeholderTextColor="gray"
        className="bg-gray-700 p-2 rounded-lg text-white mb-2"
      />
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="Date"
        placeholderTextColor="gray"
        className="bg-gray-700 p-2 rounded-lg text-white mb-2"
      />
      <TouchableOpacity onPress={handleUpload} className="bg-blue-500 p-2 rounded-lg">
        <Text className="text-white text-center">Upload Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadPost;
