import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
// import { WebView } from "react-native-webview";
import React, { useState, useCallback } from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { WORKOUT_URLS } from "../constants/Data";

import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import GifTrainer from "../components/GifTrainer";
import { Headline } from "react-native-paper";

export default function VideoScreen({ route, navigation }) {
  //const { mfile } = route.params; //mfile is the media file

  var time = new Date().getDate();
  let playback_id = time % 2 != 0 ? WORKOUT_URLS.odd : WORKOUT_URLS.even;

  const isEven = time % 2 === 0; //? 'lower' :'upper';
  //TODO: show lower or upper in header
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {/* <Headline>
        {isEven ? "Upper body workout" : "Lower body workout"}
      </Headline> */}
      {isEven && <GifTrainer day="upper" exercises={3} sets={4} />}
      {!isEven && <GifTrainer day="lower" exercises={6} sets={3} />}
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>Playing {playback_id}</Text>
  //     <WorkoutYoutube mfile={playback_id} />

  //     <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
  //   </View>
  // );
}

export function WorkoutYoutube({ mfile }) {
  // const [playing, setPlaying] = useState(false);

  // const onStateChange = useCallback((state) => {
  //   if (state === "ended") {
  //     setPlaying(false);
  //   }
  // }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying((prev) => !prev);
  // }, []);

  //this should play videos

  // uri: `https://www.youtube.com/embed/${mfile}?&autoplay=0a&mute=1&showinfo=0&controls=1&fullscreen=1`,
  return (
    <VideoPlayer
      videoProps={{
        shouldPlay: true,
        resizeMode: Video.RESIZE_MODE_CONTAIN,
        // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
        source: {
          uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        },
      }}
    />
    //     <WebView
    //       javaScriptEnabled={true}
    //       scrollEnabled={false}
    //       allowsFullscreenVideo={true}
    //       userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36
    //  (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
    //       source={{
    //         uri: "https://www.breatherightyoga.com",
    //       }}
    //     />
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
});
