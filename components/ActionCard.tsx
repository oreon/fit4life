import React, { useState, useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState as huseState } from "@hookstate/core";

import store from "../lib/Store";
import { writeTodays } from "../lib/AsyncStorageHelper";

const HamIcon = (props: any) => <Avatar.Icon {...props} icon="hamburger" />;

export default function ActionCard({
  navigation,
  title,
  text,
  cardtype,
  mfile,
  score = 10,
}) {
  const [done, setDone] = useState(false);
  const globalState = huseState(store);

  const LeftContent = (props: any) =>
    // <Avatar.Icon {...props} icon="fruit-pineapple" />
    done ? <Ionicons name="md-checkmark-circle" size={32} color="green" /> : "";

  const isav = cardtype === "audio" || cardtype === "video";

  return (
    <Card>
      <Card.Title
        title={title}
        // left={LeftContent}
        style={{ backgroundColor: done ? "lightGray" : "#dedede" }}
      />
      <Card.Content style={{ backgroundColor: done ? "lightGray" : "#dedede" }}>
        <Title style={{ color: !done ? "green" : "gray" }}></Title>
        <Paragraph style={{ color: !done ? "" : "gray" }}>{text}</Paragraph>

        {isav && (
          <Button
            onPress={() =>
              navigation.navigate(cardtype, {
                mfile: mfile,
              })
            }
          >
            Play {cardtype}
          </Button>
        )}
      </Card.Content>
      {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
      <Card.Actions>
        <Card.Actions>
          <Button
            onPress={async () => {
              setDone(true);
              globalState.merge({
                score: globalState.get().score + score,
              });
              await writeTodays("score", globalState.get().score);
            }}
            disabled={done}
          >
            Done
          </Button>
        </Card.Actions>
      </Card.Actions>
    </Card>
  );
}
