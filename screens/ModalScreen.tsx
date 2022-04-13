import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
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
import BezLineChart from "../components/BezLineChart";
import { useStoreActions, useStoreState } from "../lib/Store";
import _ from "lodash";

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
      <Button onPress={() => save()}>Save </Button>
    </View>
  );
}

export function StatsScreen() {
  //TODO - thsese should come from server or local sql lite

  const records = useStoreState((state) => state.trks);
  const [state, setstate] = useState({});

  const read_trks = useStoreActions((actions) => actions.read_trks);

  const readData = async () => {
    //TODO: avoid every time
    //if (records.length == 0)
    await read_trks();
    console.log(records);

    const scores = records.map((x) => {
      return { key: x.day, val: x.score };
    });
    const sleep = records.map((x) => {
      return { key: x.day, val: x.sleep };
    });
    const stress = records.map((x) => {
      return { key: x.day, val: x.stress };
    });

    setstate({ score: scores, sleep: sleep, stress: stress });

    console.log(_.pick(records, ["day", "sleep"]));
  };

  useEffect(() => {
    readData();
  }, []);

  const scores = [
    { key: "Jan 3 2022", val: 350 },
    { key: "Jan 4 2022", val: 250 },
    { key: "Jan 6 2022 ", val: 90 },
    { key: "Jan 9 2022 ", val: 190 },
  ];

  const sleep = [
    { key: "Jan 3 2022", val: 10 },
    { key: "Jan 4 2022", val: 5 },
    { key: "Jan 6 2022 ", val: 9 },
    { key: "Jan 9 2022 ", val: 1 },
  ];

  const stress = [
    { key: "Jan 3 2022", val: 1 },
    { key: "Jan 4 2022", val: 8 },
    { key: "Jan 6 2022 ", val: 9 },
    { key: "Jan 9 2022 ", val: 4 },
  ];

  return (
    <ScrollView>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <BezLineChart title="Scores" data={state.score} />
      <BezLineChart title="Sleep" data={state.sleep} />
      <BezLineChart title="Stress" data={state.stress} />
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
