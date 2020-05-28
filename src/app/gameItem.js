var React = require('react');
import {  BrowserRouter as Router, Route,  Link ,BrowserHistory, Switch} from 'react-router-dom';
var GameSeriesFilter = require('./gameSeriesFilter');
var AmiiboSeriesFilter = require('./amiiboSeriesFilter');

class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, gamelist: [], isLoaded: false, 
            gameSeries: this.props.match.params.gname, amiiboSeries: this.props.match.params.aname, fulllist: []};
        this.retGameList = this.retGameList.bind(this);
        this.GameSeriesHandler = this.GameSeriesHandler.bind(this);
        this.AmiiboSeriesHandler = this.AmiiboSeriesHandler.bind(this);
    }
    componentDidMount() {
        var url = "https://www.amiiboapi.com/api/amiibo/" ;
        if(this.state.amiiboSeries){
            url += "?amiiboSeries=" + encodeURI(this.state.amiiboSeries);
        }
        if(this.state.gameSeries){
            url += "?gameseries=" + encodeURI(this.state.gameSeries);
        }
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        gamelist: result.amiibo,
                        fulllist : result.amiibo
                    });
                    
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }
    render() {
        const { error, gamelist, isLoaded } = this.state;
        if (error) {
            return (<div>Error: {error.message}</div>);
        } else if (!isLoaded) {
            return (<div>Loading...</div>);
        } else {
            return (
            <div>

                <div className="row" >
                <div className="input-field col s12 l4" id="filterGameSeries">
                    <GameSeriesFilter Filter={this.GameSeriesHandler} />
                </div>
                <div className="input-field col s12 l4 " id="filterAmiiboSeries">
                    <AmiiboSeriesFilter Filter={this.AmiiboSeriesHandler} />
                </div>
                <div className="input-field col s12 l3 ">
                    <br/>
                        <a href="" onClick="function(e){e.preventDefault(); location.reload();}" class="waves-effect waves-light btn"><i class="material-icons left">clear</i>Clear Filter</a>
                </div>
                </div>
                
            <center>
                <div className="row">
                    <div className="col s12 l6 push-l1" id="gamelist">
                            <div>
                                <ul className="collection">
                                        {(gamelist.length == 0) ? <h3>No Results </h3> :gamelist.sort(function (a, b) {
                                            let comparison = 0;
                                            if (a.name > b.name)
                                                comparison = 1;
                                            else if (a.name < b.name)
                                                comparison = -1
                                            return comparison;
                                        }).map(function (item, index) {
                                        return <li key={index} className="collection-item avatar" key={item.key} value={item.name}>
                                            <img src={item.image} alt={item.character} className="circle" />
                                            <span className="title"></span>{item.name}
                                            <p> Amiibo Series : <Link to={`/aseries/${item.amiiboSeries}`} >{item.amiiboSeries}</Link> <br />
                                Game Series: <Link to={`/gseries/${item.gameSeries}`} >{item.gameSeries}</Link>
                                            </p>
                                        </li>
                                    })}
                                </ul>
                            </div>
                    </div>
                </div>
            </center>
                </div>
                
            );
        }

    }
    GameSeriesHandler(item){
        var list = this.state.gamelist.filter(function(val){ 
            return item == val.gameSeries;
        });
        //Code to reset the other filter if no common game is there
        // if(list.length == 0){
        //     document.getElementById('aseries').selectedIndex = 0;
        //     list = this.state.fulllist.filter(function (val) {
        //         return item == val.gameSeries;
        //     });
        //     this.setState({ gamelist: list });
        //     return;
        // }
        this.setState({gamelist : list});
    }
    AmiiboSeriesHandler(item) {
        var list = this.state.gamelist.filter(function (val) {
            return item == val.amiiboSeries;
        });
        //Code to reset the other filter if no common game is there
        // if (list.length == 0) {
        //     document.getElementById('gseries').selectedIndex = 0;
        //     list = this.state.fulllist.filter(function (val) {
        //         return item == val.amiiboSeries;
        //     });
        //     this.setState({ gamelist: list });
        //     return;
        // }
        this.setState({ gamelist: list });
    }
    retGameList() {
        // var originalArray = this.state.gamelist;
        // var prop = "name";
        
        // this.setState(gamelist : originalArray.; 

    }

}
class App extends React.Component {
    render() {
        return (
            
            <Router history={BrowserHistory}>
                <Route exact path={"/"} component={GameList} />
                <Route exact path={"/aseries/:aname"} component={GameList} />
                <Route exact path={"/gseries/:gname"} component={GameList} />
            </Router>
        );
    }
}
module.exports = App;