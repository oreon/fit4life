import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Caption, Headline, List } from "react-native-paper";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { allData } from "../lib/AsyncStorageHelper";
import { useStoreActions, useStoreState } from "../lib/Store";

export default function TabTwoScreen() {
  const records = useStoreState((state) => state.trks);
  const [state, setstate] = useState([]);
  const read_trks = useStoreActions((actions) => actions.read_trks);

  const readData = async () => {
    await read_trks();
    console.log(records);

    // let d = await allData();
    // //d = d?.map(x => JSON.parse(x));
    // let filters = [];
    // d = d?.map((x) => {
    //   try {
    //     x[1] = JSON.parse(x[1]);
    //     if (x[1].score) filters.push(x);
    //   } catch (error) {
    //     return;
    //   }
    //   console.log(x);
    //   return x;
    // });

    // console.log("final data ", filters);
    // setstate(filters);
  };

  useEffect(() => {
    readData();
  }, []);

  const renderlistitem = ({ item }) => {
    console.log("item is ", item);
    return (
      <List.Item
        title={item.day}
        description={item.score + " " + item.tasks + " " + item.sleep}
        left={(props) => <List.Icon {...props} icon="folder" />}
        right={
          (props) =>
            item.score > 100 && (
              <List.Icon {...props} icon="star" color="gold" />
            ) //show star if score above threshhold
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Headline> You have been doing good so far </Headline>
      <Caption>Scores</Caption>
      <FlatList
        style={styles.list}
        data={records}
        renderItem={renderlistitem}
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
