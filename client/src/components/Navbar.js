import { Image, View } from "react-native";

export default function Navbar() {
  return (
    <View
      style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
    >
      <Image
        style={{
          height: 60,
          width: 70,
          resizeMode: "contain",
          marginLeft: -10,
          marginTop: 0,
        }}
        source={{
          uri: `https://res.cloudinary.com/practicaldev/image/fetch/s--_b-IfdIg--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn.hashnode.com/res/hashnode/image/upload/v1647410910018/spTELtuIz.jpeg`,
        }}
      />
      <View>
        <Image
          style={{
            marginTop: 9,
            height: 35,
            width: 35,

            resizeMode: "contain",
          }}
          source={{
            uri: `https://pbs.twimg.com/media/DN1OYIFX0AAbOMe.jpg`,
          }}
        />
      </View>
    </View>
  );
}
