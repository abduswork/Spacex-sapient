import React, { Component } from 'react';
import launch from './launch.jpg';
import mainScreen from './main-screen.jpg';
import logo from './logo.png';
import Container from './Container';
import Filter from './Filter';
import Missions from './Missions';
import LaunchSpecs from './LaunchSpecs';
import './App.css';

class App extends Component {

  state = {
    launches: [],
    successfulOnly: false,
    successfulAndLand: false,
    myMissions: [],
    currentMission: [],
    query: '',
    clicked: false,
    rocketType: '',
    filteredRockets: [],
    filteredLaunches: [],
    filteredCustomers: [],
    allCustomers: [],
    allRockets: []
  }

  componentDidMount() {
    fetch('https://api.spacexdata.com/v3/launches?limit=100')
    .then(x => x.json())
    .then((launchData) => {
      this.setState({
            launches: launchData,
            filteredCustomers: launchData,
            filteredRockets: launchData
        });
    })
  }

  populateSelect = () => {
    let rockets = this.state.launches.map((rocket) => rocket.rocket.rocket_name)
    rockets.forEach((rocket) => {
      if(!this.state.allRockets.includes(rocket)){
        this.setState({
          allRockets: [...this.state.allRockets, rocket]
        })
      }
    })
  }

  filteredMissions = () => {
    return this.state.filteredCustomers.filter((l) => this.state.filteredRockets.includes(l)).filter((launch) =>
        (!this.state.successfulOnly || this.state.successfulOnly && launch.launch_success))
        .filter((launch) => launch.mission_name.toLowerCase().includes(this.state.query.toLowerCase()))
  }

  handleCheck = () => {
    fetch('https://api.spacexdata.com/v3/launches?limit=100&land_success=true')
    .then(x => x.json())
    .then((landData) => {
      this.setState({
        launches : landData,
        filteredCustomers: landData,
        filteredRockets: landData,
        successfulOnly: !this.state.successfulOnly
      });
    });
  }

  handleCheckForLandings = () => {
    fetch('https://api.spacexdata.com/v3/launches?limit=100&land_success=true&launch_success=true')
    .then(x => x.json())
    .then((landData) => {
      this.setState({
        launches : landData,
        filteredCustomers: landData,
        filteredRockets: landData,
        successfulAndLand: !this.state.successfulAndLand,
        });
    });
}

  handleSearch = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  handleSelect = (e) => {
    if(e.target.value === 'All Rockets') {
      this.setState({
        filteredRockets: this.state.launches
      })
    } else {
      const differentRockets = this.state.launches.filter((rocket) => rocket.rocket.rocket_name === e.target.value)
      this.setState({
        filteredRockets: differentRockets
      })
    }
  }


  missionClick = (findFlightNum) => {
    const removeLaunch = this.state.launches.filter(launch => launch.flight_number !== findFlightNum)
    const addLaunch = this.state.launches.find(launch => launch.flight_number === findFlightNum)
    this.setState({
      launches: removeLaunch,
      myMissions: [...this.state.myMissions, addLaunch]
    })
  }

  missionRemove = (findFlightNum) => {
    const removeLaunch = this.state.myMissions.filter(launch => launch.flight_number !== findFlightNum)
    const addLaunch = this.state.myMissions.find(launch => launch.flight_number === findFlightNum)
    this.setState({
      launches: [...this.state.launches, addLaunch],
      myMissions: removeLaunch
    })
  }

  clickedCheck = (id) => {
    let checkMission = this.state.launches.find((mission) => mission.flight_number === id)
    this.setState({
      clicked: !this.state.clicked,
      currentMission: checkMission
    })
  }

  goBack = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {
    if(!this.state.clicked){
      return (
        <div className="App">
          <header></header>
          <img src={mainScreen} className='bg'/>

          < Filter
            successfulOnly={this.state.successfulOnly}
            successfulAndLand={this.state.successfulAndLand}
            handleCheck={this.handleCheck}
            handleCheckForLandings={this.handleCheckForLandings}
            launches={this.state.launches}
            handleSelect={this.handleSelect}
            handleSearch={this.handleSearch}
            query={this.state.query}
            allRockets={this.state.allRockets}
            populateSelect={this.populateSelect}
          />

          {/* <div className='BREAK'></div> */}

          < Missions
            myMissions={this.state.myMissions}
            missionRemove={this.missionRemove}
          />

          < Container
            launches={this.filteredMissions()}
            clickedCheck={this.clickedCheck}
            missionRemove={this.missionRemove}
            myMissions={this.state.MyMissions}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          < LaunchSpecs
              launch={this.state.currentMission}
              missionClick={this.missionClick}
              goBack={this.goBack}
          />
        </div>
      )
    }

  }
}

export default App;
