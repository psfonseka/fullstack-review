import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }
  componentDidMount() {
    console.log("started!");
    axios.get('/repos')
    .then(data => {
      let results = data.data.results;
      if (results.length > 25) {
        results = results.slice(results.length-25, results.length);
      }
      this.setState({repos: results});
    })
  }
  search (term) {
    console.log(`${term} was searched`);
    axios.post('/repos', {
      'user': {'username': term}
    })
    .then(data => {
      let results = data.data.results;
      if (results.length > 25) {
        results = results.slice(results.length-25, results.length);
      }
      this.setState({repos: results});
      this.render();
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));