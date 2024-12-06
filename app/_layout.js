import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// This component manages navigation using a stack-based navigation system. It allows for switching between screens in a stacked order (like a stack of cards) 

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: true,
          gestureDirection: 'vertical',
          animation: 'fade',
        }}
      />
    </GestureHandlerRootView>
  );
}