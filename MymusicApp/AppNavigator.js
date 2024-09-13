import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PlaylistDetail from './screens/PlaylistDetail';
import CreatePlaylistScreen from './screens/CreatePlaylistScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetail} />
      <Stack.Screen name="CreatePlaylist" component={CreatePlaylistScreen} />
    </Stack.Navigator>
  );
}
