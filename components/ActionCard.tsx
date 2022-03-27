import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import store, { useStoreActions, useStoreState, Todo } from "../lib/Store";
import { writeTodays } from "../lib/AsyncStorageHelper";

const HamIcon = (props: any) => <Avatar.Icon {...props} icon="hamburger" />;

export default function ActionCard({ navigation, data, score = 10 }) {
  const todos = useStoreState((state) => state.todos);
  //const actions = useStoreActions((state) => state.actions);

  if (!data.score) data.score = score;

  const markdone = useStoreActions((actions) => actions.markdone);

  const LeftContent = (props: any) =>
    // <Avatar.Icon {...props} icon="fruit-pineapple" />
    data.done ? (
      <Ionicons name="md-checkmark-circle" size={32} color="green" />
    ) : (
      <Ionicons name="attach" size={32} color="gray" />
    );

  const isav = data.cardtype === "audio" || data.cardtype === "video";

  return (
    <Card style={{ margin: 5 }}>
      <Card.Title
        title={data.id + ". " + data.title}
        left={LeftContent}
        style={{ backgroundColor: data.done ? "lightGray" : "#dedede" }}
      />
      <Card.Content>
        <Title style={{ color: !data.done ? "green" : "gray" }}></Title>
        <Paragraph style={{ color: !data.done ? "#1a2a2a" : "gray" }}>
          {data.text}
        </Paragraph>

        {isav && (
          <Button
            onPress={() =>
              navigation.navigate(data.cardtype, {
                mfile: data.mfile,
              })
            }
          >
            Play {data.cardtype}
          </Button>
        )}
      </Card.Content>
      {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
      <Card.Actions>
        <Card.Actions>
          {!data.done && (
            <Button
              onPress={async () => {
                markdone(data.id);
              }}
              disabled={data.done}
            >
              Done
            </Button>
          )}
        </Card.Actions>
      </Card.Actions>
    </Card>
  );
}
