import { useAudioPlayer } from 'expo-audio';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [darkMode, setDarkMode] = useState(false);

  const player = useAudioPlayer(require('../assets/audio.mp3'));

  return (
    <View style={darkMode ? styles.dark : styles.light}>
      <Text style={darkMode ? styles.textDark : styles.textLight}>
        Tema {darkMode ? "Escuro 🌙" : "Claro ☀️"}
      </Text>

      <Button
        title="Trocar Tema"
        onPress={() => setDarkMode(!darkMode)}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="▶️ Tocar" onPress={() => player.play()} />
        <Button title="⏸️ Pausar" onPress={() => player.pause()} />
        <Button title="⏹️ Parar" onPress={() => player.seekTo(0)} />
      </View>

      <StatusBar
        style={darkMode ? "light" : "dark"}
        backgroundColor={darkMode ? "#000" : "#fff"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  light: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dark: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  textLight: {
    color: "#000",
    marginBottom: 20,
  },
  textDark: {
    color: "#fff",
    marginBottom: 20,
  },
});