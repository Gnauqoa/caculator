import { View } from "react-native";

const Row = ({ children }: { children: any }) => (
  <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>{children}</View>
);

export default Row;
