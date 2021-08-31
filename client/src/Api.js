import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "5b42baf14b999aeb69e9bef0f88d55da",
    language: "ko-KR",
  },
});

// 상대경로 baseURL/  +   tv/popular + params
// 예시: api.get("tv/popular");

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (searchTerm) =>
    api.get("search/movie", {
      params: {
        query: searchTerm,
      },
    }),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  tvDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (searchTerm) =>
    api.get("search/tv", {
      params: {
        query: searchTerm,
      },
    }),
};
