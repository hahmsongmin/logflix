import React from "react";
import { tvApi } from "../../../Api";
import TVPresenter from "./TVPresenter";

class TVContainer extends React.Component {
    state = {
        topRated: null,
        popular: null,
        airingToday: null,
        error: null,
        loading: true,
    };

    componentDidMount = async() => {
        try{
            const { data : { results : topRated }} = await tvApi.topRated();
            const { data : { results : popular }} = await tvApi.popular();
            const { data : { results : airingToday }} = await tvApi.airingToday();
            this.setState({
                topRated,
                popular,
                airingToday,
            })
        } catch {
            this.setState({
                error: "Can't find movies informaion."
            })
        } finally {
            this.setState({ loading : false });
        }
    }

    render() {
        const { topRated, popular, airingToday, error, loading } = this.state;
        console.log(this.state)
        return (
            <TVPresenter 
                topRated = {topRated}
                popular = {popular}
                airingToday = {airingToday}
                error = {error}
                loading = {loading}
            />
        )
    }
};

export default TVContainer;