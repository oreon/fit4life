import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { useState } from "@hookstate/core";
import store, { Todo, useStoreActions, useStoreState } from "./lib/Store";
import { readTodays, storeData } from "./lib/AsyncStorageHelper";

import * as Notifications from "expo-notifications";
import { CARDS } from "./constants/Data";
import { StoreProvider } from "easy-peasy";

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

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StoreProvider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </StoreProvider>
    );
  }
}
