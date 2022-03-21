import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { Audio } from "expo-av";
import { Button } from "react-native-paper";

export default function AudioScreen({ route, navigation }) {
  const { mfile } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mfile}</Text>
      <TrackPlayer filename={mfile} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

export function TrackPlayer({ filename }) {
  const [sound, setSound] = useState(null);
  const [playing, setPlaying] = useState(false);

  async function playSound() {
    console.log("Loading Sound ", filename);
    //const file = ;
    //console.log(file);
    //TODO improve this shitty code - the replay / pause funcitonality is broken
  }

  React.useEffect(async () => {
    if (filename === "breath") {
      console.log("playing breath");
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/pre-meals.mp3")
      );
      setSound(sound);
    } else {
      console.log("playing relaxation");
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/3_min_breathing.mp3")
      );
      setSound(sound);

      //await sound.playAsync();
    }
  }, []);

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handlePlayPause = async () => {
    playing ? await sound.pauseAsync() : await sound.playAsync();
    setPlaying(!playing);
  };

  return (
    <View style={styles.controls}>
      <TouchableOpacity
        style={styles.control}
        onPress={() => handlePlayPause()}
      >
        {playing ? (
          <Ionicons name="ios-pause" size={48} color="#444" />
        ) : (
          <Ionicons name="ios-play-circle" size={48} color="#444" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  controls: {
    flexDirection: "row",
  },
  control: {
    margin: 20,
  },
});
