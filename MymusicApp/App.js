import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const tracks = [
    { title: 'Song 1', uri: 'https://example.com/song1.mp3' },
    { title: 'Song 2', uri: 'https://example.com/song2.mp3' },
    { title: 'Song 3', uri: 'https://example.com/song3.mp3' },
  ];

  async function playSound() {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: tracks[currentTrackIndex].uri }
    );
    setSound(newSound);

    await newSound.playAsync();
    setIsPlaying(true);
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function nextTrack() {
    if (sound) {
      await sound.unloadAsync();
    }

    const newIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(newIndex);
    setIsPlaying(false);

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: tracks[newIndex].uri }
    );
    setSound(newSound);
    await newSound.playAsync();
    setIsPlaying(true);
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Player</Text>
      <Text style={styles.trackTitle}>{tracks[currentTrackIndex].title}</Text>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={isPlaying ? pauseSound : playSound}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={nextTrack} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tracks}
        renderItem={({ item }) => (
          <View style={styles.track}>
            <Text style={styles.trackTitle}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  trackTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1DB954',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  track: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
