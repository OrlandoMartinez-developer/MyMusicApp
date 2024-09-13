import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { getPlaylists, savePlaylists } from '../services/playlistService';

export default function PlaylistDetail({ route }) {
  const { playlist } = route.params;
  const [songs, setSongs] = useState(playlist.songs);

  const handleReorder = async ({ data }) => {
    setSongs(data);

    const storedPlaylists = await getPlaylists();
    const updatedPlaylists = storedPlaylists.map(pl => pl.name === playlist.name ? { ...pl, songs: data } : pl);
    await savePlaylists(updatedPlaylists);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{playlist.name}</Text>
      <DraggableFlatList
        data={songs}
        renderItem={({ item, drag, isActive }) => (
          <Text onLongPress={drag} style={styles.songItem}>{item.title}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={handleReorder}
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
  },
  songItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

