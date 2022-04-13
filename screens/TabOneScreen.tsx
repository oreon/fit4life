import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";

import EditScreenInfo from "../components/EditScreenInfo";
import Player from "../components/Player";
import { Text, View } from "../components/Themed";

import { RootTabScreenProps } from "../types";
import * as _ from "lodash";

import { useState } from "@hookstate/core";

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
//import { GlobalContext } from "../App";
import { getData, readTodays, storeData } from "../lib/AsyncStorageHelper";
import store, { useStoreActions, useStoreState } from "../lib/Store";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const todos = useStoreState((state) => state.todos);
  const score = useStoreState((state) => state.score);
  const user = useStoreState((state) => state.user);

  const logoutAction = useStoreActions((actions) => actions.logout);

  const logout = () => {
    logoutAction();
    // globalState.merge({ userid: null });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled" // http://t.cn/EowE3r3
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Headline>
        Your score {score}/ {_.keys(CARDS).length}
      </Headline>
      <Button onPress={() => logout()}>Log out {user}</Button>

      {todos.map((k) => (
        <ActionCard navigation={navigation} key={k.id} data={k} />
      ))}
      <Button onPress={() => navigation.navigate("Modal")}>
        Update my score !
      </Button>
    </ScrollView>
  );
}

// title={k.title}
// text={k.text}
// cardtype={k.cardtype}
// mfile={k.media}
// score={k.score}

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
