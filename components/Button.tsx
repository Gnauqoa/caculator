import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface IButton {
  value: string;
  style?: "secondary" | "accent" | "double";
  onPress: () => void;
}
const Button = ({ value, style, onPress }: IButton) => {
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
