import * as ScreenOrientation from "expo-screen-orientation";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Button from "../../components/Button";
import { useClipboard } from "../../hooks/useClipboard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import useHistory from "../../hooks/useHistory";
import { StatusBar } from "expo-status-bar";

const Row = ({ children }: { children: any }) => (
  <View style={styles.row}>{children}</View>
);

export default function App() {
  const [displayValue, setDisplayValue] = useState("");
  const [mode, setMode] = useState(1);
  const { addHistory } = useHistory();
  const { copy } = useClipboard();
  const handleEqualsPress = () => {
    if (displayValue === "") return;
    const result = eval(displayValue);
    if (result.toString() === displayValue) return;
    addHistory({ calculation: displayValue, result });
    setDisplayValue(result.toString());
  };

  const handleClearPress = () => {
    setDisplayValue("");
  };

  const handleCopyPress = () => {
    copy(displayValue);
  };

  const handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const input = event.nativeEvent.text;
    const validInput = input.replace(/[^0-9+\-*/%÷ .×]/g, "");
    setDisplayValue(validInput);
  };

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View
        style={[
          styles.container,
          mode !== ScreenOrientation.Orientation.PORTRAIT_UP
            ? styles.containerLandscape
            : null,
        ]}
      >
        <StatusBar style="dark" />
        <SafeAreaView style={{ width: "100%" }}>
          <View style={{ position: "relative", width: "100%" }}>
            <TextInput
              style={{
                color: "#fff",
                width: "100%",
                fontSize: 40,
                textAlign: "center",
                zIndex: 10,
              }}
              value={displayValue}
              onChange={handleChange}
            />
            <View
              style={{
                zIndex: 20,
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              <TouchableOpacity onPress={handleCopyPress}>
                <AntDesign name="copy1" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <Row>
            <Button value="C" onPress={handleClearPress} style="secondary" />
            <Button value="=" onPress={handleEqualsPress} style="accent" />
          </Row>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#202020",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLandscape: {
    flexDirection: "row",
  },
  computedValue: {
    color: "#fff",
    width: "100%",
    fontSize: 40,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
  },
  btnText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "500",
  },
});
