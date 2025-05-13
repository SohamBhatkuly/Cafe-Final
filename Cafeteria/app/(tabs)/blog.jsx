import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { ArrowLeftIcon, HeartIcon, ChatBubbleLeftRightIcon, ShareIcon, PlusIcon, PencilSquareIcon } from 'react-native-heroicons/solid';
import { useNavigation } from 'expo-router';
import UploadPost from '../../components/uploadPost';

const BlogPost = ({ post, onLike, onComment, onCreatePost }) => {
  const navigation = useNavigation();
  const [newComment, setNewComment] = useState('');

  // Fallback to default values if post or its properties are missing
  const {
    profileImage = 'https://via.placeholder.com/150',
    username = 'Unknown User',
    date = 'Unknown Date',
    postImage = 'https://via.placeholder.com/500',
    likes = 0,
    comments = [],
  } = post || {};

  const handleAddComment = () => {
    if (newComment.trim()) {
      onComment(newComment);
      setNewComment('');
    }
  };

  return (
    <View className="bg-blackk flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mt-2 h-[60px]">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl"
        >
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
        
        <Text className="text-2xl font-bold flex-1 text-center text-white">Post</Text>

        {/* User Profile Image */}
        <View className="relative">
          <Image
            source={{ uri: profileImage }}
            className="w-10 h-10 rounded-full"
            defaultSource={{ uri: 'https://via.placeholder.com/150' }}
          />
        </View>
      </View>

      {/* Line */}
      <View className="bg-gray-400 w-full h-[2px]" />

      {/* User Info and Post */}
      <View className="px-4 py-4">
        {/* User Profile */}
        <View className="flex-row items-center">
          <Image
            source={{ uri: profileImage }}
            className="w-10 h-10 rounded-full"
            defaultSource={{ uri: 'https://via.placeholder.com/150' }}
          />
          <View className="ml-3">
            <Text className="text-white font-bold">{username}</Text>
            <Text className="text-gray-400">{date}</Text>
          </View>
        </View>

        {/* Post Image */}
        <View className="my-4">
          <Image
            source={{ uri: postImage }}
            className="w-full h-72 rounded-lg"
            resizeMode="cover"
            defaultSource={{ uri: 'https://via.placeholder.com/500' }}
          />
        </View>

        {/* Post Actions */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row space-x-4">
            {/* Like Button */}
            <TouchableOpacity className="flex-row items-center" onPress={() => onLike()}>
              <HeartIcon size={22} color="tan" />
              <Text className="text-white ml-1">{likes}</Text>
            </TouchableOpacity>

            {/* Comment Button */}
            <TouchableOpacity className="flex-row items-center">
              <ChatBubbleLeftRightIcon size={22} color="tan" />
              <Text className="text-white ml-1">{comments.length}</Text>
            </TouchableOpacity>

            {/* Share Button */}
            <TouchableOpacity>
              <ShareIcon size={22} color="tan" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <PlusIcon size={24} color="tan" />
          </TouchableOpacity>
        </View>

        {/* Add Comment */}
        <View className="mt-4">
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Add a comment..."
            placeholderTextColor="gray"
            className="bg-gray-700 p-2 rounded-lg text-white"
          />
          <TouchableOpacity onPress={handleAddComment} className="mt-2 bg-main p-2 rounded-lg">
            <Text className="text-white text-center">Post Comment</Text>
          </TouchableOpacity>
        </View>

        {/* Comments */}
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View className="border-b border-gray-600 py-2">
              <Text className="text-white">{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingTop: 10 }}
        />
      </View>

      {/* Create Post Button */}
      <TouchableOpacity
        onPress={UploadPost}
        className="absolute bottom-6 right-6 bg-main p-4 rounded-full"
      >
        <PencilSquareIcon size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default BlogPost;
