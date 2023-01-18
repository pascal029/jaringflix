import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { GET_MOVIE } from "../apollo/queries";
import { useQuery } from "@apollo/client";

export default function Movie({ navigation, route }) {
  const [movie, setMovie] = useState({});
  const [genre, setGenre] = useState("");
  const [casts, setCasts] = useState([]);

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { getMovieId: route.params.id },
    fetchPolicy: "no-cache",
  });
  if (data && !movie.id) setMovie(data.getMovie);
  if (data && !genre) setGenre(data.getMovie.Genre.name);
  if (data && casts.length === 0) setCasts(data.getMovie.Casts);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1.5 }}>
        <YoutubePlayer height={300} play={true} videoId={movie.trailerUrl} />
      </View>
      <View style={{ flex: 3 }}>
        <View style={{ flexDirection: "row", marginLeft: -15 }}>
          <Image
            style={{ marginTop: 5, height: 50, width: 50 }}
            source={{
              uri: "https://res.cloudinary.com/practicaldev/image/fetch/s--_b-IfdIg--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn.hashnode.com/res/hashnode/image/upload/v1647410910018/spTELtuIz.jpeg",
            }}
          />
          <Text
            style={{
              color: "white",
              marginTop: 20,
              fontSize: 20,
              lineHeight: 1.6 * 20,
            }}
          >
            {genre}
          </Text>
        </View>
        <View flexDirection="row">
          <Text style={{ color: "green" }}>Movie Rating :</Text>
          <Text style={{ color: "yellow" }}>{movie.rating}</Text>
        </View>

        <View
          style={{ backgroundColor: "white", borderRadius: 3, marginTop: 3 }}
        >
          <Button title="Play" color="#1f2937" />
        </View>

        <View
          style={{
            backgroundColor: "#1f2937",
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 3,
          }}
        >
          <Button title="Download" color="white" />
        </View>

        <Text style={{ color: "white" }}>Movie title : {movie.title}</Text>
        <Text style={{ color: "#a3a3a3", marginTop: 5 }}>{movie.synopsis}</Text>
        <Text style={{ color: "white", marginTop: 10 }}>Cast : </Text>
        <View flexDirection="row" style={{ paddingTop: 5 }}>
          {casts.length > 0 &&
            casts.map((cast, i) => {
              return (
                <View key={i} style={{ padding: 5 }}>
                  <Image
                    style={{ height: 100, width: 100, borderRadius: 3 }}
                    source={{ uri: cast.profilePict }}
                  />
                  <Text style={{ color: "white", marginTop: 10 }}>
                    {cast.name}
                  </Text>
                </View>
              );
            })}
        </View>

        <View
          flexDirection="row"
          style={{
            padding: 20,
            marginLeft: -20,
            justifyContent: "space-around",
          }}
        >
          <View>
            <AntDesign name="plus" size={40} color="white" />
            <Text style={{ color: "grey" }}>My List</Text>
          </View>
          <View>
            <AntDesign name="like2" size={40} color="white" />
            <Text style={{ color: "grey" }}>Rate</Text>
          </View>
          <View>
            <Octicons name="share" size={40} color="white" />
            <Text style={{ color: "grey" }}>Share</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
});
