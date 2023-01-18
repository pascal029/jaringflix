import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Home from "../pages/Home";
import Movie from "../pages/Movie";

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "black" } }}
    >
      <Stack.Screen
        name="Home"
        options={{ title: "", headerShown: false }}
        component={Home}
      />
      <Stack.Screen
        name="Movie"
        options={{ title: "", headerShown: false }}
        component={Movie}
      />
    </Stack.Navigator>
  );
}
