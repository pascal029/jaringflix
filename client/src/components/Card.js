import { Image, Text, View, TouchableHighlight } from "react-native";
import { Gesture } from "react-native-gesture-handler";

export default function Card({ item, navigation }) {
  const singleTap = () => navigation.navigate("Movie", { id: item.id });
  return (
    <View style={{ padding: 5 }}>
      <TouchableHighlight onPress={singleTap}>
        <Image
          style={{ height: 100, width: 100, borderRadius: 5 }}
          source={{ uri: item.imgUrl }}
        />
      </TouchableHighlight>

      <Text style={{ color: "white", textAlign: "center" }}>{item.title}</Text>
    </View>
  );
}
