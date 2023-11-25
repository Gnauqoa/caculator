import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Text, View } from "../components/Themed";
import { useContext } from "react";
import { HistoryContext } from "../context/history";
import { AntDesign } from "@expo/vector-icons";
import { HistoryRow } from "../components/History";
import HistoryHead from "../components/History/HistoryHead";

export default function ModalScreen() {
  const { calculationHistories } = useContext(HistoryContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>History</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <HistoryHead />
      {calculationHistories.map((history, index) => (
        <HistoryRow isOdd={!!(index % 2)} key={index} {...history} />
      ))}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
