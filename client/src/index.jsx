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
      this.setState({repos: results});
    })
  }
  search (term) {
    console.log(`${term} was searched`);
    axios.post('/repos', {
      'user': {'username': term}
    })
    .then(data => {
      console.log(data);
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));