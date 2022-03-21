import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const HamIcon = (props: any) => <Avatar.Icon {...props} icon="hamburger" />;

export default function ActionCard({
  navigation,
  title,
  text,
  cardtype,
  mfile,
}) {
  const [done, setDone] = useState(false);

  const LeftContent = (props: any) =>
    // <Avatar.Icon {...props} icon="fruit-pineapple" />
    done ? <Ionicons name="md-checkmark-circle" size={32} color="green" /> : "";

  const isav = cardtype === "audio" || cardtype === "video";

  //   const screen = ""
  //   if (cardtype === "audio") screen ="Audio"

  return (
    <Card>
      <Card.Title
        title={title}
        left={LeftContent}
        style={{ backgroundColor: done ? "lightGray" : "#dedede" }}
      />
      <Card.Content style={{ backgroundColor: done ? "lightGray" : "#dedede" }}>
        {/* <Title style={{ color: !done ? "" : "gray" }}>
          {done ? (
            <FontAwesome
              name="info-circle"
              size={25}
              style={{ marginRight: 15 }}
            />
          ) : (
            ""
          )}
        </Title> */}
        <Paragraph style={{ color: !done ? "" : "gray" }}>
          {text} {mfile}
        </Paragraph>

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
          <Button onPress={() => setDone(true)} disabled={done}>
            Done
          </Button>
        </Card.Actions>
      </Card.Actions>
    </Card>
  );
}
