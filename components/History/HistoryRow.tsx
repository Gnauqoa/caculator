import { Text, TouchableOpacity, View } from "react-native";
import { HistoryType } from "../../context/history";
import { AntDesign } from "@expo/vector-icons";
import { useClipboard } from "../../hooks/useClipboard";

const HistoryRow = ({
  calculation,
  result,
  isOdd,
}: HistoryType & { isOdd?: boolean }) => {
  const { copy } = useClipboard();
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "white",
          paddingTop: 4,
          paddingBottom: 4,
          width: "50%",
          paddingLeft: 10,
          paddingRight: 10,
          gap: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: isOdd ? "white" : "#f09a36",
          }}
        >
          {calculation}
        </Text>
        <View style={{ position: "relative", marginLeft: "auto" }}>
          <TouchableOpacity onPress={() => copy(calculation)}>
            <AntDesign name="copy1" size={14} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "white",
          paddingTop: 4,
          paddingBottom: 4,
          width: "50%",
          paddingLeft: 10,
          paddingRight: 10,
          gap: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: isOdd ? "white" : "#f09a36",
          }}
        >
          {result}
        </Text>
        <View style={{ position: "relative", marginLeft: "auto" }}>
          <TouchableOpacity onPress={() => copy(result.toString())}>
            <AntDesign name="copy1" size={14} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HistoryRow;
