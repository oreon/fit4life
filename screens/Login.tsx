import { useState } from "@hookstate/core";
import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import store from "../lib/Store";

export default function Login() {
  const globalState = useState(store);
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          globalState.merge({
            user: "jay smith",
          }),
            alert("logged in " + globalState.get().user);
        }}
      >
        Log me in
      </Button>
      <Text> USER {store.get().user}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
