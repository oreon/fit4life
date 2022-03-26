/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Text } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useStoreActions, useStoreState } from "../lib/Store";

import Article from "../screens/Article";
import AudioScreen from "../screens/AudioScreen";
import Login from "../screens/Login";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Posts from "../screens/Posts";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import VideoScreen, { WorkoutYoutube } from "../screens/VideoScreen";
import Workout from "../screens/Workout";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { readTodays, storeData } from "../lib/AsyncStorageHelper";
import { CARDS } from "../constants/Data";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const user = useStoreState((state) => state.user);

  const todos = useStoreState((state) => state.todos);
  //const actions = useStoreActions((state) => state.actions);

  const addTodo = useStoreActions((actions) => actions.addTodo);
  const setuser = useStoreActions((actions) => actions.setuser);

  const readData = async () => {
    try {
      let currscore = await readTodays("score", 0);
      if (isNaN(currscore)) currscore = 0;
      // globalState.merge({
      //   score: currscore,
      // });
      console.log("read score ", currscore);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    readData();

    //just for testing
    storeData("2022-03-21_score", "200");
    storeData("2022-03-20_score", "100");
    storeData("2022-03-19_score", "90");
    storeData("2022-03-18_score", "0");
    storeData("2022-03-16_score", "40");

    const user = readData("user");

    if (user) {
      setuser(user);
    }

    Object.keys(CARDS).map((k, i) => {
      let todo = {} as Todo;
      todo.id = CARDS[k].id;
      todo.score = CARDS[k].score;
      todo.text = CARDS[k].text;
      todo.title = k;
      todo.done = false;
      todo.mfile = CARDS[k].media;
      todo.cardtype = CARDS[k].type;
      addTodo(todo);
    });
  }, []);

  //const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //if (user) {
    console.log("user is -> " + user);
    // }
  }, [user]);

  return user != null ? (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="audio" component={AudioScreen} />
        <Stack.Screen name="video" component={VideoScreen} />
        <Stack.Screen name="Article" component={Article} />
      </Stack.Group>
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Todays",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Journal",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Posts"
        component={Posts}
        options={{
          title: "Posts",
          tabBarIcon: ({ color }) => <TabBarIcon name="folder" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Workout"
        component={Workout}
        options={{
          title: "Workout",
          tabBarIcon: ({ color }) => <TabBarIcon name="folder" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
