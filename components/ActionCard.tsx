import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

const LeftContent = (props: any) => (
  <Avatar.Icon {...props} icon="fruit-pineapple" />
);

const HamIcon = (props: any) => <Avatar.Icon {...props} icon="hamburger" />;

export default function ActionCard({ navigation, title, text, cardtype }) {
  const [swf, setSwf] = useState(false);

  const isav = cardtype === "audio" || cardtype === "video";

  //   const screen = ""
  //   if (cardtype === "audio") screen ="Audio"

  return (
    <Card>
      <Card.Title title={title} left={LeftContent} />
      <Card.Content style={{ backgroundColor: swf ? "lightGray" : "#dedede" }}>
        {/* <Title style={{ color: !swf ? "" : "gray" }}>
          {swf ? (
            <FontAwesome
              name="info-circle"
              size={25}
              style={{ marginRight: 15 }}
            />
          ) : (
            ""
          )}
        </Title> */}
        <Paragraph style={{ color: !swf ? "" : "gray" }}>{text}</Paragraph>
        {isav ? (
          <Pressable onPress={() => navigation.navigate(cardtype)}>
            <FontAwesome
              name="info-circle"
              size={25}
              style={{ marginRight: 15 }}
            />
            View {cardtype} {isav}
          </Pressable>
        ) : (
          ""
        )}
      </Card.Content>
      {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
      <Card.Actions>
        <Card.Actions>
          <Button onPress={() => setSwf(true)} disabled={swf}>
            Done
          </Button>
        </Card.Actions>
      </Card.Actions>
    </Card>
  );
}
