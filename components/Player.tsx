import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const audioBookPlaylist = [
  {
    title: "Hamlet - Act I",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act II",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act III",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act IV",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act V",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
];

export default function Player() {
  const [state, setstate] = useState({
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false,
  });

  const loadAudio = async () => {
    const { currentIndex, isPlaying, volume } = state;
    98;
    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        uri: audioBookPlaylist[currentIndex].uri,
      };

      const status = {
        shouldPlay: isPlaying,
        volume,
      };

      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      setstate({ playbackInstance });
    } catch (e) {
      console.log(e);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    setstate({
      isBuffering: status.isBuffering,
    });
  };

  useEffect(async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });

      loadAudio();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.albumCover}
        source={{
          uri: "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
        }}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.control} onPress={() => alert("")}>
          <Ionicons name="ios-skip-backward" size={48} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={() => alert("")}>
          {state.isPlaying ? (
            <Ionicons name="ios-pause" size={48} color="#444" />
          ) : (
            <Ionicons name="ios-play-circle" size={48} color="#444" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={() => alert("")}>
          <Ionicons name="ios-skip-forward" size={48} color="#444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  albumCover: {
    width: 250,
    height: 250,
  },
  controls: {
    flexDirection: "row",
  },
  control: {
    margin: 20,
  },
});
