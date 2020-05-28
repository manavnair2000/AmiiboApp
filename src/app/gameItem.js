var React = require('react');
var GameSeriesFilter = require('./gameSeriesFilter');
var AmiiboSeriesFilter = require('./amiiboSeriesFilter');
class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, gamelist: [], isLoaded: false, gameSeries: "", amiiboSeries: "", fulllist: []};
        this.retGameList = this.retGameList.bind(this);
        this.GameSeriesHandler = this.GameSeriesHandler.bind(this);
        this.AmiiboSeriesHandler = this.AmiiboSeriesHandler.bind(this);
    }
    componentDidMount() {

        fetch("https://www.amiiboapi.com/api/amiibo")
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
        const { error, items, isLoaded } = this.state;
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
            </div>
            <center>
                <div className="row">
                    <div className="col s12 l6" id="gamelist">
                            <div>
                                <ul className="collection">
                                        {this.state.gamelist.sort(function (a, b) {
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
                                            <p> Amiibo Series : <a href="http://" >{item.amiiboSeries}</a> <br />
                                Game Series: <a href="#">{item.gameSeries} </a>
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
        if(list.length == 0){
            document.getElementById('aseries').selectedIndex = 0;
            list = this.state.fulllist.filter(function (val) {
                return item == val.gameSeries;
            });
            this.setState({ gamelist: list });
            return;
        }
        this.setState({gamelist : list});
    }
    AmiiboSeriesHandler(item) {
        var list = this.state.gamelist.filter(function (val) {
            return item == val.amiiboSeries;
        });
        if (list.length == 0) {
            document.getElementById('gseries').selectedIndex = 0;
            list = this.state.fulllist.filter(function (val) {
                return item == val.amiiboSeries;
            });
            this.setState({ gamelist: list });
            return;
        }
        this.setState({ gamelist: list });
    }
    retGameList() {
        // var originalArray = this.state.gamelist;
        // var prop = "name";
        
        // this.setState(gamelist : originalArray.; 

    }

}
module.exports = GameList;