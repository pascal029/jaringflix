import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Download from "./src/pages/Download";
import AppNavigator from "./src/routes/AppNavigator";
import { ApolloProvider } from "@apollo/client";
import client from "./src/apollo/config";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "AppNavigator") {
                return <Ionicons name="home" size={size} color={color} />;
              } else if (route.name === "Download") {
                return (
                  <Ionicons
                    name="ios-code-download-outline"
                    size={size}
                    color={color}
                  />
                );
              }
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "white",
            tabBarActiveBackgroundColor: "black",
            tabBarInactiveBackgroundColor: "black",
            tabBarStyle: {
              borderTopWidth: 0,
              borderBottomWidth: 0,
              paddingBottom: 0,
            },
          })}
        >
          <Tab.Screen
            options={{ title: "Home", headerShown: false }}
            name="AppNavigator"
            component={AppNavigator}
          />
          <Tab.Screen
            name="Download"
            component={Download}
            options={{ title: "Download", headerShown: false }}
            headerStyle={{ backgroundColor: "black" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
