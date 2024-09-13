import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import PlaylistItem from '../components/PlaylistItem';
import { getPlaylists, deletePlaylist } from '../services/playlistService';

export default function HomeScreen({ navigation }) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const loadPlaylists = async () => {
      const storedPlaylists = await getPlaylists();
      setPlaylists(storedPlaylists);
    };
    loadPlaylists();
  }, []);

  const handleDeletePlaylist = async (playlistName) => {
    await deletePlaylist(playlistName);
    const updatedPlaylists = await getPlaylists();
    setPlaylists(updatedPlaylists);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playlists</Text>

      <FlatList
        data={playlists}
        renderItem={({ item }) => (
          <PlaylistItem
            playlist={item}
            onDelete={handleDeletePlaylist}
            onSelect={() => navigation.navigate('PlaylistDetail', { playlist: item })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button
        title="Create Playlist"
        onPress={() => navigation.navigate('CreatePlaylist')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
