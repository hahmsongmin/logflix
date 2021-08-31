import React, {Component} from "react";
import { moviesApi } from "../../../Api";
import HomePresenter from "./HomePresenter";


class HomeContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            popular: null,
            videos: null,
            error: null,
            info: null,
            loading: true,
        }
    }

    componentDidMount = async () => {
        let videos = null;
        let movieId = null;
        try{
            const {data : {results : popular }} = await moviesApi.popular();
            const moviesId = popular.map(movieId => movieId.id)
            while(true){
                movieId = moviesId[Math.floor(Math.random() * 20)];
                if(movieId){
                    ({ data : { videos : { results : videos }}}= await moviesApi.movieDetail(movieId));
                    if (videos.length === 0){
                        continue;
                    } else {
                        break;
                    }
                }
            }
        this.setState({
            popular,
        });
        }catch{
            this.setState({
                error: "Can't find movies informaion."
            })
        }finally{
            this.setState({
                loading: false, 
                videos,
            })
        }
    }
    render() {
        const { popular, videos, error, loading } 
        = this.state;
        return (
            <HomePresenter 
            popular = {popular} 
            videos = {videos}
            user = {this.props.user}
            info = {this.props.info}
            error = {error}
            loading = {loading}
            />
        );
    }
}

export default HomeContainer;