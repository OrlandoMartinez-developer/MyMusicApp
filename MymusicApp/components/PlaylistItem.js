import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PlaylistItem = ({ playlist, onDelete, onSelect }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => onSelect(playlist)}>
      <Text style={styles.name}>{playlist.name}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onDelete(playlist.name)} style={styles.deleteButton}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
  },
});

export default PlaylistItem;
