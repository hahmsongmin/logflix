import React, { Component } from "react";
import { moviesApi, tvApi } from "../../../Api";
import DetailPresenter from "./DetailPresenter";

class DetailContainer extends Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = this.props;
    this.state = {
      id: null,
      result: null,
      error: null,
      loading: false,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { isMovie } = this.state;
    const numberId = Number(id);

    let result = null;
    let videos = null;

    try {
      if (isMovie) {
        // const 빼고 처리 방법  동일방법 ==== const { data : result }
        ({ data: result } = await moviesApi.movieDetail(numberId));
        ({
          data: {
            videos: { results: videos },
          },
        } = await moviesApi.movieDetail(numberId));
      } else {
        ({ data: result } = await tvApi.tvDetail(numberId));
        ({
          data: {
            videos: { results: videos },
          },
        } = await tvApi.tvDetail(numberId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, videos, id });
    }
  }

  render() {
    const { result, videos, error, isMovie, loading } = this.state;
    console.log(this.props);
    return (
      <>
        <DetailPresenter
          result={result}
          videos={videos}
          isMovie={isMovie}
          error={error}
          loading={loading}
        />
      </>
    );
  }
}

export default DetailContainer;
