import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/audio.mp3')
    );
    setSound(sound);
  }

  async function playSound() {
    if (!sound) return;
    await sound.playAsync();
    setIsPlaying(true);
  }

  async function pauseSound() {
    if (!sound) return;
    await sound.pauseAsync();
    setIsPlaying(false);
  }

  async function stopSound() {
    if (!sound) return;
    await sound.stopAsync();
    setIsPlaying(false);
  }

  useEffect(() => {
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={darkMode ? styles.darkContainer : styles.lightContainer}>
      
      <Text style={darkMode ? styles.darkText : styles.lightText}>
        Tema {darkMode ? "Escuro 🌙" : "Claro ☀️"}
      </Text>

      <Button
        title="Trocar Tema"
        onPress={() => setDarkMode(!darkMode)}
      />

      <View style={{ marginTop: 30 }}>
        <Button title="▶️ Tocar" onPress={playSound} />
        <Button title="⏸️ Pausar" onPress={pauseSound} />
        <Button title="⏹️ Parar" onPress={stopSound} />
      </View>

      <StatusBar
        style={darkMode ? "light" : "dark"}
        backgroundColor={darkMode ? "#121212" : "#ffffff"}
        translucent={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  lightText: {
    color: "#000",
    marginBottom: 20,
    fontSize: 18,
  },
  darkText: {
    color: "#fff",
    marginBottom: 20,
    fontSize: 18,
  },
});