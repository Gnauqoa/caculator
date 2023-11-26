import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Operator } from "../hooks/useCalculation";

export interface ButtonProps {
  value: string;
  style?: "secondary" | "accent" | "double";
  operator?: Operator;
  onPress: () => void;
}
const Button = ({ operator, value, style, onPress }: ButtonProps) => {
  const btnStyles: any[] = [styles.btn, { flex: 1, height: "100%" }];
  const txtStyles: any[] = [styles.btnText];
  if (style === "secondary") {
    btnStyles.push(styles.btnSecondary);
    txtStyles.push(styles.btnTextSecondary);
  }
  if (style === "accent") {
    btnStyles.push(styles.btnAccent);
  }
  return (
    <TouchableOpacity style={[btnStyles]} onPress={onPress}>
      {operator && operator === value && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4) ",
          }}
        ></View>
      )}

      <Text style={txtStyles}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "500",
  },
  btn: {
    backgroundColor: "#333333",
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
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
});

export default Button;
