import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Caption, Headline, List } from "react-native-paper";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Headline> You have been doing good so far </Headline>
      <Caption>Scores</Caption>
      <FlatList
        style={styles.list}
        data={[
          { key: "Jan 3 2022", val: 350 },
          { key: "Jan 4 2022", val: 250 },
          { key: "Jan 6 2022 ", val: 90 },
          { key: "Jan 9 2022 ", val: 190 },
        ]}
        renderItem={({ item }) => (
          <List.Item
            title={item.key}
            description={item.val}
            left={(props) => <List.Icon {...props} icon="folder" />}
            right={
              (props) =>
                item.val > 300 && (
                  <List.Icon {...props} icon="star" color="gold" />
                ) //show star if score above threshhold
            }
          />
        )}
      />
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
  list: {
    flex: 1,
    width: "90%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
