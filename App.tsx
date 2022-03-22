import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { useState } from "@hookstate/core";
import store from "./lib/Store";
import { readTodays } from "./lib/AsyncStorageHelper";

// export const GlobalContext = React.createContext({
//   score: 30,
//   setScore: () => {},
// });

// const GlobalProvider = (props) => {
//   const [score, setScore] = React.useState(40);
//   const [user, setUser] = React.useState("Jonny");

//   const increment = () => {
//     setScore(score + 1);
//   };

//   return (
//     <GlobalContext.Provider value={score}>
//       {props.children}
//     </GlobalContext.Provider>
//   );
// };

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const globalState = useState(store);

  useEffect(() => {
    readData();
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
