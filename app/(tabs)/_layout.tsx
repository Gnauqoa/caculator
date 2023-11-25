import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

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

  return (
    <Tabs
      screenOptions={{
        
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
          headerRight: () => (
            <Link href="/history" asChild>
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
          headerRight: () => (
            <Link href="/history" asChild>
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
        }}
      />
    </Tabs>
  );
}
