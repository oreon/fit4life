import React from "react";
import { View, Text, ScrollView } from "react-native";
import GifTrainer from "../components/GifTrainer";

export default function Workout({ route, navigation }) {
  return (
    <ScrollView>
      <GifTrainer day="upper" exercises={3} sets={4} />
      <GifTrainer day="lower" exercises={6} sets={3} />
    </ScrollView>
  );
}

// import React, { useState } from "react";
// import { View, StyleSheet, Text } from "react-native";
// import { Countdown } from "../components/countdown";
// import { RoundedButton } from "../components/RoundedButton";
// import { spacing } from "../utils/sizes";
// import { colors } from "../utils/colors";

// export default function Workout({ focusSubject }) {
//   const [isStarted, setIsStarted] = useState(false);
//   return (
//     <View style={styles.container}>
//       <View style={styles.countdown}>
//         <Countdown
//           isPaused={!isStarted}
//           onProgress={() => {}}
//           onEnd={() => {}}
//         />
//         <View style={{ paddingTop: spacing.xxl }}>
//           <Text style={styles.title}>Focusing on:</Text>
//           <Text style={styles.task}>{focusSubject}</Text>
//         </View>
//       </View>
//       <View style={styles.buttonWrapper}>
//         {!isStarted ? (
//           <RoundedButton title="start" onPress={() => setIsStarted(true)} />
//         ) : (
//           <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   countdown: {
//     flex: 0.5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonWrapper: {
//     flex: 0.3,
//     flexDirection: "row",
//     padding: 15,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     color: colors.white,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   task: {
//     color: colors.white,
//     textAlign: "center",
//   },
// });
