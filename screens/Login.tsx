import { useState } from "@hookstate/core";
import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import store, { useStoreActions, useStoreState } from "../lib/Store";

export default function Login() {
  const user = useStoreState((state) => state.user);
  const login = useStoreActions((actions) => actions.login);
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          login("jay_smith");
        }}
      >
        Log me in
      </Button>
      <Text> USER {user}</Text>
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
