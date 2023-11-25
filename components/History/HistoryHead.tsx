import { Text, View } from "react-native";

const HistoryHead = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          fontSize: 20,
          width: "50%",
          borderWidth: 1,
          borderColor: "white",
          paddingTop: 4,
          paddingBottom: 4,
          textAlign: "center",
          color: "white",
        }}
      >
        Calculation
      </Text>
      <Text
        style={{
          fontSize: 20,
          width: "50%",
          borderWidth: 1,
          borderColor: "white",
          paddingTop: 4,
          paddingBottom: 4,
          textAlign: "center",
          color: "white",
        }}
      >
        Result
      </Text>
    </View>
  );
};

export default HistoryHead;
