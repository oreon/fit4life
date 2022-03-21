import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";

import EditScreenInfo from "../components/EditScreenInfo";
import Player from "../components/Player";
import { Text, View } from "../components/Themed";

import { RootTabScreenProps } from "../types";
import * as _ from "lodash";

import { ScrollView } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Headline,
} from "react-native-paper";
import ActionCard from "../components/ActionCard";
import { CARDS } from "../constants/Data";
import { GlobalContext } from "../App";
import { getData, readTodays, storeData } from "../lib/AsyncStorageHelper";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  //const score = useContext(GlobalContext);

  // const score = ;
  // setScore(score);

  // useEffect(() => {
  //   console.log("called");
  //   return async () => {

  //   };
  // }, []);

  //const curscore = await readTodays("score", 2);

  const [score, setScore] = React.useState(0);

  const updateScore = async () => {
    setScore(score + 1);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled" // http://t.cn/EowE3r3
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Headline>
        Your score {score} / {_.keys(CARDS).length}
      </Headline>
      <Button onPress={() => navigation.navigate("Modal")}>Go to modal</Button>
      {Object.keys(CARDS).map((k, i) => (
        <ActionCard
          navigation={navigation}
          key={k}
          title={k}
          text={CARDS[k].text}
          cardtype={CARDS[k].type}
          mfile={CARDS[k].media}
          updateScore={updateScore}
        />
      ))}
      {/* <ActionCard
        navigation={navigation}
        title="Meditation upon waking up"
        text={"Mind is primed for meditation at this time"}
        cardtype="audio"
      /> */}
      <Button onPress={() => navigation.navigate("Modal")}>
        Update my score !
      </Button>
    </ScrollView>
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
