// import React from 'react';
// import ReactDOM from 'react-dom';
import M from 'materialize-css';
var React = require('react');
var ReactDOM = require('react-dom');
// Game items
class GameSeriesFilter extends React.Component{
    constructor(props){
        super(props);
        this.state = { error:null, gameSeries: [], isGameLoaded: false};
        this.retGameList = this.retGameList.bind(this);
    }
    componentDidMount() {
        fetch("https://www.amiiboapi.com/api/gameseries")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isGameLoaded: true,
                        gameSeries: result.amiibo
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
            M.FormSelect.init(this.select);
    }
    render() {
        const { error, items, isGameLoaded } = this.state;
        if (error) {
            return (<div>Error: {error.message}</div>);
        } else if (!isGameLoaded) {
            return (<div>Loading...</div>);
        } else {
            return (
                <div className="input-field col s12 l4 ">
                        <label> Get by Game Series</label>
                        <select id="gameSeries" multiple={true} ref={(select)=>{this.select = select}}>
            {this.retGameList().map(function(item){ return <option key = {item.key} value={item.name}>{item.name}</option>})}  
                        </select>
                        
                </div>
            );
        }
    }
    retGameList(){
        var originalArray = this.state.gameSeries;
        var prop = "name";
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray.sort(function(a,b){
            let comparison =0;
            if(a.name > b.name)
                comparison = 1;
            else if(a.name < b.name)
                comparison = -1
            return comparison;
        });

    }
}
class GameList extends React.Component{
    constructor(props){
        super(props);
        this.state = { error : null, gamelist: [],isLoaded :false};
        this.retGameList = this.retGameList.bind(this);
    }
    componentDidMount(){
        fetch("https://www.amiiboapi.com/api/amiibo")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isGameLoaded: true,
                        gamelist: result.amiibo
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error : error
                    });
                }
            )
    }
    render(){
        // const { error, items, isLoaded } = this.state;
        // if (error) {
        //     return (<div>Error: {error.message}</div>);
        // } else if (!isLoaded) {
        //     return (<div>Loading...</div>);
        // } else {
            return (
                <div>
                    {/* {JSON.stringify(this.state.gamelist)} */}
                    <ul className="collection">
                        {this.retGameList().map(function (item,index) { return <li key={index} className="collection-item avatar" key={item.key} value={item.name}>
                            <img src={item.image} alt={item.character} className="circle"/>
                            <span className="title"></span>{item.name}
                            <p> Amiibo Series : <a href="http://" >{item.amiiboSeries}</a> <br/>
                                Game Series: <a href="#">{item.gameSeries} </a>
                            </p>
                            </li> 
                        })}  
                    </ul>
                </div>
            );
        // }

    }
    retGameList() {
        var originalArray = this.state.gamelist;
        var prop = "name";
        // var newArray = [];
        // var lookupObject = {};

        // for (var i in originalArray) {
        //     lookupObject[originalArray[i][prop]] = originalArray[i];
        // }

        // for (var i in originalArray) {
        //     newArray.push(originalArray[i]);
        // }
        return originalArray.sort(function (a, b) {
            let comparison = 0;
            if (a.name > b.name)
                comparison = 1;
            else if (a.name < b.name)
                comparison = -1
            return comparison;
        });

    }
}


ReactDOM.render(<GameSeriesFilter/> , document.getElementById('Filter'));
ReactDOM.render(<GameList/> ,document.getElementById('gamelist'));