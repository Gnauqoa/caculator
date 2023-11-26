import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import Button from "../../../components/Button";
import useCalculation, { Operator } from "../../../hooks/useCalculation";

const Row = ({ children }: { children: any }) => (
  <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>{children}</View>
);

export default function Portrait() {
  const {
    display,
    handleClearPress,
    handleDecimalPress,
    handleEqualsPress,
    handleNumberPress,
    handlePaste,
    handleOperatorPress,
  } = useCalculation();

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        flexDirection: "column",
        backgroundColor: "#202020",
        gap: 4,
      }}
    >
      <StatusBar style="dark" />
      <Text
        style={{
          paddingBottom: 20,
          color: "#fff",
          fontSize: 40,
          textAlign: "right",
          paddingRight: 20,
        }}
      >
        {display}
      </Text>

      <Row>
        <Button value="C" style="secondary" onPress={handleClearPress} />
        <Button
          value={Operator.ToggleSign}
          style="secondary"
          onPress={() => handleOperatorPress(Operator.ToggleSign)}
        />
        <Button
          value={Operator.Division100}
          style="secondary"
          onPress={() => handleOperatorPress(Operator.Division100)}
        />
        <Button
          value={Operator.Division}
          style="accent"
          onPress={() => handleOperatorPress(Operator.Division)}
        />
      </Row>
      <Row>
        <Button value="7" onPress={() => handleNumberPress("7")} />
        <Button value="8" onPress={() => handleNumberPress("8")} />
        <Button value="9" onPress={() => handleNumberPress("9")} />
        <Button
          value={Operator.Multiplication}
          style="accent"
          onPress={() => handleOperatorPress(Operator.Multiplication)}
        />
      </Row>
      <Row>
        <Button value="4" onPress={() => handleNumberPress("4")} />
        <Button value="5" onPress={() => handleNumberPress("5")} />
        <Button value="6" onPress={() => handleNumberPress("6")} />
        <Button
          value={Operator.Subtraction}
          style="accent"
          onPress={() => handleOperatorPress(Operator.Subtraction)}
        />
      </Row>
      <Row>
        <Button value="1" onPress={() => handleNumberPress("1")} />
        <Button value="2" onPress={() => handleNumberPress("2")} />
        <Button value="3" onPress={() => handleNumberPress("3")} />
        <Button
          value={Operator.Addition}
          style="accent"
          onPress={() => handleOperatorPress(Operator.Addition)}
        />
      </Row>
      <Row>
        <Button value="0" onPress={() => handleNumberPress("0")} />
        <Button value="." onPress={handleDecimalPress} />
        <Button value="Paste" style="accent" onPress={handlePaste} />
        <Button value="=" style="accent" onPress={handleEqualsPress} />
      </Row>
    </View>
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
