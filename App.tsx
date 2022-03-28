import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { useState } from "@hookstate/core";
import store, { Todo, useStoreActions, useStoreState } from "./lib/Store";
import { allData, readTodays, storeData } from "./lib/AsyncStorageHelper";

import * as Notifications from "expo-notifications";
import { CARDS } from "./constants/Data";
import { StoreProvider } from "easy-peasy";
import TodoRepo from "./model/TodoModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootSiblingParent } from "react-native-root-siblings";
//import * as SQLite from "expo-sqlite";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const vals = [
  { score: 200, dones: [1, 2, 3, 6] },
  { score: 100, dones: [2, 3, 5] },
  { score: 120, dones: [1, 8, 6] },
];

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    dummydata();
    console.log(allData());
  }, []);

  const dummydata = async () => {
    //await AsyncStorage.

    await storeData("2022-03-26", vals[0]);
    await storeData("2022-03-25", vals[1]);
    await storeData("2022-03-23", vals[2]);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <StoreProvider store={store}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </StoreProvider>
      </RootSiblingParent>
    );
  }
}
