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
import Row from "../../components/Row";

export default function App() {
  const [displayValue, setDisplayValue] = useState("");
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
        style={{
          flex: 1,
          paddingTop: 20,
          backgroundColor: "#202020",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <StatusBar style="dark" />
        <View style={{ position: "relative", width: "100%" }}>
          <TextInput
            style={{
              color: "#fff",
              width: "100%",
              fontSize: 40,
              paddingHorizontal: 20,
              textAlign: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#fff",
              zIndex: 10,
            }}
            value={displayValue}
            onChange={handleChange}
          />
          <View
            style={{
              zIndex: 20,
              position: "absolute",
              left: 10,
              top: 0,
            }}
          >
            <TouchableOpacity onPress={handleCopyPress}>
              <AntDesign name="copy1" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: "10%", width: "100%" }}>
          <Row>
            <Button value="C" onPress={handleClearPress} style="secondary" />
            <Button value="=" onPress={handleEqualsPress} style="accent" />
          </Row>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
