import React, { Component } from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from "../components/Scroll";
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {
    constructor () {
      super ();
      this.state = {
        robots : [],
        searchinput : ""
      }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then (users => {this.setState({robots : users})});
    }

    onSearchChange = (event) => {
        this.setState( {searchinput: event.target.value})
    }

    render () {
        const { robots, searchinput } = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchinput.toLowerCase());
        } )

        return !robots.length? 
          <h1>Loading</h1> : 
        (
           <div className="tc">
             <h1 className='f1'>RoboFriends</h1>
             <SearchBox searchChange = {this.onSearchChange}/>
             <Scroll>
              <ErrorBoundry>
                <Cardlist robots = { filterRobots }/>
              </ErrorBoundry>
             </Scroll>
           </div>
        );
    }
}

export default App;