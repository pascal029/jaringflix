import { View, Image, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function NavbarDownload() {
  return (
    <View
      style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 30,
          paddingTop: 10,
          paddingLeft: 10,
        }}
      >
        Downloads
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Feather name="cast" size={30} color="white" style={{ padding: 10 }} />
        <Feather
          name="search"
          size={30}
          color="white"
          style={{ padding: 10 }}
        />
        <Image
          style={{
            height: 35,
            width: 35,
            resizeMode: "contain",
            marginTop: 9,
            marginLeft: 3,
          }}
          source={{
            uri: `https://pbs.twimg.com/media/DN1OYIFX0AAbOMe.jpg`,
          }}
        />
      </View>
    </View>
  );
}
