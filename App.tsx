import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export const GlobalContext = React.createContext({
  score: 30,
  setScore: () => {},
});

const GlobalProvider = (props) => {
  const [score, setScore] = React.useState(40);
  const [user, setUser] = React.useState("Jonny");

  const increment = () => {
    setScore(score + 1);
  };

  return (
    <GlobalContext.Provider value={score}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // const [score, setScore] = useState(0);

  // const user = null;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GlobalProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </GlobalProvider>
    );
  }
}
