import React from "react";
import useScreenOrientation from "../../hooks/useScreenOrientation";
import { Portrait } from "../section/calculator";
import { View } from "react-native";

export default function Calculator() {
  const { isPortrait } = useScreenOrientation();

  if (isPortrait) return <Portrait />;
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 1, backgroundColor: "red" }} />
      <View style={{ flex: 2, backgroundColor: "darkorange" }} />
      <View style={{ flex: 3, backgroundColor: "green" }} />
    </View>
  );
}
