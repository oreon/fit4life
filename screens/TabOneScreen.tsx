import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";

import EditScreenInfo from "../components/EditScreenInfo";
import Player from "../components/Player";
import { Text, View } from "../components/Themed";

import { RootTabScreenProps } from "../types";

import { ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import ActionCard from "../components/ActionCard";
import { CARDS } from "../constants/Data";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled" // http://t.cn/EowE3r3
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Button onPress={() => navigation.navigate("Modal")}>Go to modal</Button>
      {Object.keys(CARDS).map((k, i) => (
        <ActionCard
          navigation={navigation}
          key={k}
          title={k}
          text={CARDS[k].text}
          cardtype={CARDS[k].type}
          mfile={CARDS[k].media}
        />
      ))}
      {/* <ActionCard
        navigation={navigation}
        title="Meditation upon waking up"
        text={"Mind is primed for meditation at this time"}
        cardtype="audio"
      /> */}
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
