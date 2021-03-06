import * as React from "react";
import { ScrollView, StyleSheet, Platform, Text, Image } from "react-native";

import { Avatar, Card, Title, Paragraph } from "react-native-paper";

//import YoutubePlayer from "react-native-youtube-iframe";
import Constants from "expo-constants";

import { useState, useCallback, useRef } from "react";
import { Button, View, Alert, Animated } from "react-native";
//import { WebView } from "react-native-webview";
//import { WORKOUT_URLS } from "./data";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
//import { Text, View, StyleSheet,  } from "react-native";

//icon - human

// const legs = [
//   "https://easyslimandfit.com/media/django-summernote/2021-07-18/da7a55d3-bd1a-4a1a-b174-93726056e4a0.gif",
//   "https://easyslimandfit.com/media/django-summernote/2021-07-18/29884665-6613-4557-923c-0c02e1658747.gif",
//   "https://easyslimandfit.com/media/django-summernote/2021-07-18/d0d46999-7d9a-4e19-92dd-4423d8872a94.gif",
// ];

const legs = ["squat", "lunge", "side-lunge", "glute_bridge"];

//TODO: replay is not working , also this should be coustimzable for other workouts
// Play sounds on start and end
// Add instructions

export default function GifTrainer() {
  const sets = 2;
  const exercises = 4;
  const REST = 2;
  const INTERVAL = 4;

  const [isPlaying, setIsPlaying] = React.useState(false);

  const [current, setCurrent] = React.useState(1);
  const [setNumber, setSetNumber] = React.useState(1);
  const [resting, setResting] = useState(false);
  const [duration, setDuration] = useState(INTERVAL);

  const finished = () => setNumber > sets;
  const restart = () => {
    setCurrent(1);
    setSetNumber(1);
    setResting(false);
  };

  //TODO :  end workout , switch workout to upper body, play sound, r and l leg, description

  const avatarImage = () => {
    switch (current) {
      case 1:
        return require("../assets/images/legs/squat.gif");
      case 2:
        return require("../assets/images/legs/lunge.gif");
      case 3:
        return require("../assets/images/legs/side-lunge.gif");
      case 4:
        return require("../assets/images/legs/glute_bridge.gif");

      // case 3:
      //   return require("../assets/images/legs/lunge.gif");
      // case 4:
      //   return require("../assets/images/legs/side-lunge.gif");
      // case 5:
      //   return require("../assets/images/legs/side-lunge.gif");
      // case 6:
      //   return require("../assets/images/legs/glute_bridge.gif");
    }
  };

  let prev_resting = resting;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled" // http://t.cn/EowE3r3
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Card style={{ flex: 1, height: "100%" }}>
        <Card.Title title="Lower body" />
        <Card.Content>
          {!finished() && (
            <View>
              <Title>
                Set {setNumber} / {sets}
              </Title>
              <Text>
                Exercise {current}/{exercises}
                {/* {finished() ? "done" : "ongoing"} */}
              </Text>

              <CountdownCircleTimer
                isPlaying={isPlaying}
                key={duration}
                duration={duration}
                size={120}
                colors={[
                  ["#004777", 0.4],
                  ["#F7B801", 0.4],
                  ["#A30000", 0.2],
                ]}
                onComplete={() => {
                  // console.log(resting.current);
                  prev_resting = resting;
                  setResting(!resting);
                  // console.log("is resting ->", prev_resting);
                  if (!prev_resting) {
                    setDuration(REST);

                    setCurrent(exercises !== current ? current + 1 : 1);
                    if (current == exercises) setSetNumber(setNumber + 1);
                  } else {
                    setDuration(INTERVAL);
                  }

                  // console.log("set->", setNumber);
                  // console.log("ex->", current);

                  return [!finished()];
                }}
              >
                {({ remainingTime, animatedColor }) => (
                  <Animated.Text style={{ color: animatedColor, fontSize: 30 }}>
                    {remainingTime}
                  </Animated.Text>
                )}
              </CountdownCircleTimer>
              {!resting && <Card.Cover source={avatarImage()} />}
              {resting && <Title> Rest !</Title>}
              <Button
                title={isPlaying ? "Pause" : "Play"}
                onPress={() => setIsPlaying((prev) => !prev)}
              />
            </View>
          )}
          {finished() && (
            <View>
              <Button title={"Replay"} onPress={restart} />
              <Title> Well done ! workout finsihed </Title>
            </View>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  logo: {
    width: "90%",
    height: "90%",
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
  },
});
