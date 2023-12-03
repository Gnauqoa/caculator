import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, TouchableOpacity, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import useScreenOrientation from "../../hooks/useScreenOrientation";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { handleToggle } = useScreenOrientation();
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={handleToggle}>
            <MaterialIcons
              style={{ marginLeft: 15 }}
              name="screen-rotation"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <Link href="/History" asChild>
            <Pressable>
              {({ pressed }) => (
                <MaterialIcons
                  name="history"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
        tabBarActiveTintColor: "#f09a36",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Converter",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="code" color={focused ? "#f09a36" : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: "Calculator",
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              size={20}
              name="calculator"
              color={focused ? "#f09a36" : color}
            />
          ),
          tabBarActiveTintColor: "#f09a36",
        }}
      />
    </Tabs>
  );
}
