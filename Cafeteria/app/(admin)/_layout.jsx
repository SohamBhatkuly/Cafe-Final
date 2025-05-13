import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const StackLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="orders" options={{ headerShown: false }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="items" options={{ headerShown: false }} />
        <Stack.Screen name="reviews" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style='light'/>
    </>
    
  );

};

export default StackLayout;
