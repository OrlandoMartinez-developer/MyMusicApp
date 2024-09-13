import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPlaylists = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('playlists');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error fetching playlists', e);
  }
};

export const savePlaylists = async (playlists) => {
  try {
    const jsonValue = JSON.stringify(playlists);
    await AsyncStorage.setItem('playlists', jsonValue);
  } catch (e) {
    console.error('Error saving playlists', e);
  }
};

export const deletePlaylist = async (playlistName) => {
  const playlists = await getPlaylists();
  const filteredPlaylists = playlists.filter(pl => pl.name !== playlistName);
  await savePlaylists(filteredPlaylists);
};
