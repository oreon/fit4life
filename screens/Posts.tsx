import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PropTypes from "prop-types";

import { fetchApiData } from "../api";
import RenderHTML from "react-native-render-html";
import { Headline, List } from "react-native-paper";

export const Posts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    const route = `articles?per_page=10&page=${page}`;
    fetchApiData(route).then((res) => {
      setPosts(res);
    });
    // fetchApiData(route).then((res) => {
    //   if (res.code !== "rest_post_invalid_page_number") {
    //     setPosts((prevPosts) => [...prevPosts, ...res]);
    //   } else {
    //     setLastPage(true);
    //   }
    //   setLoading(false);
    // });
  }, [page]);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 5 }}>
      {posts.length > 0 ? (
        <FlatList
          onEndReached={() => {
            if (!loading && !lastPage) {
              setPage((prevPage) => prevPage + 1);
            }
          }}
          keyExtractor={(item) => item.id + "xxx"}
          data={posts}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Article", { article: item })}
            >
              <List.Item
                title={item.title}
                description={item.title}
              ></List.Item>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

Posts.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Posts;
