import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import TrackPlayer from 'react-native-track-player';

// Define SongType interface
interface SongType {
  id: number;
  title: string;
  artist: string;
  album?: string;  // Opcional
}

const App = () => {
  // Declare state with correct types
  const [songs, setSongs] = useState<SongType[]>([]);
  const [currentSong, setCurrentSong] = useState<SongType | null>(null);
  const [theme, setTheme] = useState({ primary: '#000', background: '#fff' });

  useEffect(() => {
    // Fetch songs on mount
    fetchSongs();
  }, []);

  const fetchSongs = async (sortBy = '') => {
    try {
      const response = await axios.get<SongType[]>(`http://10.0.2.2:5000/songs?sort_by=${sortBy}`);
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const playSong = async (song: SongType) => {
    setCurrentSong(song);
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: song.id.toString(),
      url: `path/to/${song.title}.mp3`,
      title: song.title,
      artist: song.artist,
      album: song.album || '',
    });
    await TrackPlayer.play();

    // Track play count and hours listened
    await axios.post('http://localhost:5000/track_hours', {
      song_id: song.id,
      hours: 0.03, // Example, track minutes
    });
  };

  const changeTheme = (newPrimaryColor: string) => {
    setTheme({ primary: newPrimaryColor, background: '#fff' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.primary }]}>My Music App</Text>

      {/* List of Songs */}
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.songContainer}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Button title="Play" onPress={() => playSong(item)} />
          </View>
        )}
      />

      {/* Theme changer */}
      <View style={styles.themeChanger}>
        <Button title="Change Theme" onPress={() => changeTheme('#ff6347')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  songContainer: {
    marginVertical: 10,
  },
  songTitle: {
    fontSize: 18,
  },
  themeChanger: {
    marginTop: 20,
  },
});

export default App;

