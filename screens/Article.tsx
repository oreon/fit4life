import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Headline } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import WebView from "react-native-webview";

//TODO html is not rendering
export default function Article({ route, navigation }) {
  const { article } = route.params;
  return (
    <ScrollView>
      <Headline>{article.title}</Headline>
      <Text>{article.body}</Text>
      {/* <Card>
        <Card.Title title={article.title} />
        <Card.Content style={{ backgroundColor: "#dedede" }}>
          <Text>{article.body}</Text>
        </Card.Content>
      </Card> */}
    </ScrollView>
  );
}
