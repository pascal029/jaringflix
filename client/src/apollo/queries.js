import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query Query {
    getMovies {
      title
      slug
      synopsis
      id
      trailerUrl
      imgUrl
      rating
      genreId
      mongoId
      Casts {
        id
        name
        profilePict
        movieId
      }
      Genre {
        name
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query Query($getMovieId: ID) {
    getMovie(id: $getMovieId) {
      id
      title
      synopsis
      trailerUrl
      imgUrl
      rating
      Casts {
        name
        profilePict
        id
      }
      Genre {
        name
      }
      user {
        username
      }
    }
  }
`;
