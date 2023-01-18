import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../apollo/queries";
import Navbar from "../components/Navbar";
import YoutubePlayer from "react-native-youtube-iframe";
import { useState } from "react";
import Card from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../components/Loader";

export default function Home({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [popular, setPopular] = useState([]);
  const [action, setAction] = useState([]);
  const [romance, setRomance] = useState([]);

  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) return <Loader />;
  if (data && movies.length == 0) setMovies(data.getMovies);
  if (data && !movie.id) setMovie(data.getMovies[0]);
  if (data && popular.length == 0) {
    const tempPopular = data.getMovies.filter((el) => el.rating >= 7);
    setPopular(tempPopular);
  }
  if (data && action.length == 0) {
    const tempAction = data.getMovies.filter((el) => el.Genre.name == "action");
    setAction(tempAction);
  }
  if (data && action.length == 0) {
    const tempRomance = data.getMovies.filter(
      (el) => el.Genre.name == "romance"
    );
    setRomance(tempRomance);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Navbar />
      </View>

      <ScrollView style={{ marginTop: 60 }}>
        <View>
          <YoutubePlayer height={300} play={true} videoId={movie.trailerUrl} />
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "black",
            padding: 10,
            marginTop: -70,
          }}
        >
          <Text style={{ color: "white", marginLeft: 5 }}>Now Playing</Text>
          <FlatList
            data={movies}
            horizontal={true}
            renderItem={({ item }) => (
              <Card item={item} navigation={navigation} />
            )}
          ></FlatList>
          <StatusBar style="auto" />
        </View>
        <View style={{ flex: 2, backgroundColor: "black", padding: 10 }}>
          <Text style={{ color: "white", marginLeft: 5 }}>
            Most Watched Movies
          </Text>
          <FlatList
            data={popular}
            horizontal={true}
            renderItem={({ item }) => (
              <Card item={item} navigation={navigation} />
            )}
          ></FlatList>
          <StatusBar style="auto" />
        </View>
        <View style={{ flex: 2, backgroundColor: "black", padding: 10 }}>
          <Text style={{ color: "white", marginLeft: 5 }}>Action Movie</Text>
          <FlatList
            data={action}
            horizontal={true}
            renderItem={({ item }) => (
              <Card item={item} navigation={navigation} />
            )}
          ></FlatList>
          <StatusBar style="auto" />
        </View>
        <View style={{ flex: 2, backgroundColor: "black", padding: 10 }}>
          <Text style={{ color: "white", marginLeft: 5 }}>Romance Movie</Text>
          <FlatList
            data={romance}
            horizontal={true}
            renderItem={({ item }) => (
              <Card item={item} navigation={navigation} />
            )}
          ></FlatList>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
