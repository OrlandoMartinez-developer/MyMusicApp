import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getPlaylists, savePlaylists } from '../services/playlistService';

export default function CreatePlaylistScreen({ navigation }) {
  const [playlistName, setPlaylistName] = useState('');

  const handleCreatePlaylist = async () => {
    const storedPlaylists = await getPlaylists();
    const newPlaylist = { name: playlistName, songs: [] };
    const updatedPlaylists = [...storedPlaylists, newPlaylist];
    await savePlaylists(updatedPlaylists);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Playlist Name"
        value={playlistName}
        onChangeText={setPlaylistName}
      />
      <Button title="Create Playlist" onPress={handleCreatePlaylist} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});
