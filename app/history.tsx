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
import { HistoryRow } from "../components/History";
import HistoryHead from "../components/History/HistoryHead";

export default function ModalScreen() {
  const { calculationHistories, clearHistory } = useContext(HistoryContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>History</Text>

      {calculationHistories.length === 0 ? (
        <Text
          style={{
            fontSize: 14,
            color: "#fff",
            textAlign: "center",
            paddingTop: 20,
          }}
        >
          You don't have any record
        </Text>
      ) : (
        <>
          <TouchableOpacity
            style={{ marginLeft: "auto", paddingBottom: 12 }}
            onPress={clearHistory}
          >
            <Text style={{ fontSize: 14, fontWeight: "600" }}>Clear</Text>
          </TouchableOpacity>
          <HistoryHead />
          {calculationHistories.map((history, index) => (
            <HistoryRow isOdd={!!(index % 2)} key={index} {...history} />
          ))}
        </>
      )}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
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
