import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { useState } from "@hookstate/core";
import store from "./lib/Store";
import { readTodays, storeData } from "./lib/AsyncStorageHelper";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const globalState = useState(store);

  useEffect(() => {
    readData();

    //just for testing
    storeData("2022-03-21_score", "200");
    storeData("2022-03-20_score", "100");
    storeData("2022-03-19_score", "90");
    storeData("2022-03-18_score", "0");
    storeData("2022-03-16_score", "40");
  }, []);

  const readData = async () => {
    try {
      let currscore = await readTodays("score", 0);
      if (isNaN(currscore)) currscore = 0;
      globalState.merge({
        score: currscore,
      });
      console.log("read score ", currscore);
    } catch (error) {
      alert(error);
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
