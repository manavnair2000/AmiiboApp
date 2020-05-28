var React = require('react');
class GameSeriesFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, gameSeries: [], isGameLoaded: false };
        this.retGameList = this.retGameList.bind(this);
        this.onFilter = this.onFilter.bind(this);
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
                        isGameLoaded: true,
                        error
                    });
                }
            );
    }
    render() {
        const { error, items, isGameLoaded } = this.state;
        if (error) {
            return (<div>Error: {error.message}</div>);
        } else if (!isGameLoaded) {
            return (<div>Loading...</div>);
        } else {
            return (
                <div>
                    <label htmlFor="gseries">Get by Game Series</label>
                    <select id="gseries" className="browser-default" onChange={(e) => this.onFilter(e)}>
                        <option key={0} value="" selected disabled>Choose you series</option>
    {this.retGameList().map((item) => { return (<option key={item.key} value={item.name} >{item.name}</option> );})}
                    </select>
                </div>
            );
        }
    }
    onFilter(e) {
        e.preventDefault()
        this.props.Filter(e.target.value);
    }
    retGameList() {
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
        return newArray.sort(function (a, b) {
            let comparison = 0;
            if (a.name > b.name)
                comparison = 1;
            else if (a.name < b.name)
                comparison = -1
            return comparison;
        });

    }
}
module.exports = GameSeriesFilter;