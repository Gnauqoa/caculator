import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, Text, ScrollView } from "react-native";
import useHistory from "../../../hooks/useHistory";
import { useClipboard } from "../../../hooks/useClipboard";
import useScreenOrientation from "../../../hooks/useScreenOrientation";
import Button from "../../../components/Button";
import useCalculation from "../../../hooks/useCalculation";

const Row = ({ children }: { children: any }) => (
  <View style={styles.row}>{children}</View>
);

export default function Portrait() {
  const {
    display,
    handleClearPress,
    handleDecimalPress,
    handleEqualsPress,
    handleNumberPress,
    handleCopy,
    handlePaste,
    handleOperatorPress,
  } = useCalculation();
  const { isLandscape, handleToggle } = useScreenOrientation();

  return (
    <ScrollView
      style={[styles.container, isLandscape ? null : styles.containerLandscape]}
    >
      <StatusBar style="dark" />
      <SafeAreaView style={{ width: "100%" }}>
        <Text style={styles.computedValue}>{display}</Text>

        <Row>
          <Button value="C" style="secondary" onPress={handleClearPress} />
          <Button
            value="+/-"
            style="secondary"
            onPress={() => handleOperatorPress("+/-")}
          />
          <Button
            value="%"
            style="secondary"
            onPress={() => handleOperatorPress("%")}
          />
          <Button
            value="/"
            style="accent"
            onPress={() => handleOperatorPress("/")}
          />
        </Row>
        <Row>
          <Button value="7" onPress={() => handleNumberPress("7")} />
          <Button value="8" onPress={() => handleNumberPress("8")} />
          <Button value="9" onPress={() => handleNumberPress("9")} />
          <Button
            value="x"
            style="accent"
            onPress={() => handleOperatorPress("x")}
          />
        </Row>
        <Row>
          <Button value="4" onPress={() => handleNumberPress("4")} />
          <Button value="5" onPress={() => handleNumberPress("5")} />
          <Button value="6" onPress={() => handleNumberPress("6")} />
          <Button
            value="-"
            style="accent"
            onPress={() => handleOperatorPress("-")}
          />
        </Row>
        <Row>
          <Button value="1" onPress={() => handleNumberPress("1")} />
          <Button value="2" onPress={() => handleNumberPress("2")} />
          <Button value="3" onPress={() => handleNumberPress("3")} />
          <Button
            value="+"
            style="accent"
            onPress={() => handleOperatorPress("+")}
          />
        </Row>
        <Row>
          <Button value="0" onPress={() => handleNumberPress("0")} />
          <Button value="." onPress={handleDecimalPress} />
          <Button value="=" style="accent" onPress={handleEqualsPress} />
        </Row>
        <Row>
          <Button value="Paste" onPress={handlePaste} />
          <Button value="Copy Result" onPress={handleCopy} />
        </Row>
        <Row>
          <Button
            value={isLandscape ? "Landscape" : "Portrait"}
            onPress={handleToggle}
          />
        </Row>
      </SafeAreaView>
    </ScrollView>
  );
}

const BTN_MARGIN = 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    flexDirection: "column",
  },
  containerLandscape: {
    flexDirection: "row",
  },

  computedValue: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
  },
  btnText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "500",
  },

  btn: {
    backgroundColor: "#333333",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: BTN_MARGIN,
    borderRadius: 100,
  },
  btn2: {
    backgroundColor: "#333333",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: BTN_MARGIN,
    borderRadius: 100,
  },
  btnSecondary: {
    backgroundColor: "#a6a6a6",
  },
  btnTextSecondary: {
    color: "#060606",
  },
  btnAccent: {
    backgroundColor: "#f09a36",
  },
  btnDouble: {
    alignItems: "flex-start",
    flex: 0,
  },
});
