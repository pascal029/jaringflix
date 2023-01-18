import { View, Text, StyleSheet, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarDownload from "../components/NavbarDownload";
import { Feather } from "@expo/vector-icons";
export default function Settings({}) {
  return (
    <SafeAreaView style={style.container}>
      <View style={{ flex: 1 }}>
        <NavbarDownload />
      </View>
      <View style={{ flex: 9 }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Feather name="settings" size={24} color="white" />
          <Text
            style={{ color: "white", fontSize: 18, padding: 2, marginLeft: 5 }}
          >
            Smart Downloads
          </Text>
        </View>
        <View
          style={{
            flex: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            Introducing Downloads for You
          </Text>

          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: "grey",
                fontSize: 15,
                textAlign: "center",
                maxWidth: 200,
              }}
            >
              We'll download a personalized selector of movies and shows for
              you, so there's always something to watch on your device.
            </Text>
          </View>

          <Image
            style={{ height: 100, width: 100, marginTop: 50, borderRadius: 5 }}
            source={{
              uri: `https://cdns.klimg.com/kapanlagi.com/p/headline/476x238/25-poster-film-indonesia-terbaik-sampai-8f77e3.jpg`,
            }}
          />
          <View
            style={{
              backgroundColor: "#3b82f6",
              width: 300,
              marginTop: 50,
              borderRadius: 5,
            }}
          >
            <Button title="Set Up" color="white" />
          </View>
          <View
            style={{
              backgroundColor: "white",
              width: 220,
              marginTop: 10,
              borderRadius: 5,
            }}
          >
            <Button title="See What You Can Download" color="#1f2937" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
