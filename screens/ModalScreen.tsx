import * as React from "react";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Headline,
} from "react-native-paper";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CustomSlider from "../components/CustomSlider";
import Settings from "./Settings";

const Tab = createMaterialTopTabNavigator();
const cur_date_str = new Date().toISOString().split("T")[0];

export default function ModalScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Track" component={TrackerScreen} />
      <Tab.Screen name="Charts" component={StatsScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export function TrackerScreen() {
  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <CustomSlider name="sleep" label="Sleep" />
      <CustomSlider name="stress" label="Stress" />
      <CustomSlider name="steps" label="Steps walked" />
      {/* <Button onPress={() => save()}>Save </Button> */}
    </View>
  );
}

export function StatsScreen() {
  return (
    <View style={styles.container}>
      <Headline>Track your day !</Headline>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>Here are your stats !</Text>
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
});
