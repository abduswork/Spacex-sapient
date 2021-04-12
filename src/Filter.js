import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import './App.css';

class Filter extends Component {


rocketTypeFilter = () => {
  return this.props.allRockets.map((rocket) => <option value={rocket}>{rocket}</option>)
}

render() {
  this.props.populateSelect()
  // this.props.populateCustomers()

  const rocketsSelectObject = this.props.allRockets.map((rocket) => ({value: rocket, text: rocket}))
    return (
      <div className="filterStuff">

        <form className="inline">
          <label>Search Missions:</label>
          <input
            className="ui fluid category search filterStuff"
            placeholder="Search for..."
            value={this.props.query}
            onChange={this.props.handleSearch}
          />
        </form>

        <div className="inline">
            <label className="labelCheck">
              Successful Missions Filters:
            </label>
            <Button
              className="SpacexButton"
              name="successfulOnly"
              type="button"
              checked={this.props.successfulOnly}
              onClick={this.props.handleCheck}
            >Filter Launch Success Missions</Button>
        </div>


        <div className="inline">
            <label className="labelCheck">
              Successful Missions & Land Filters:
            </label>
            <Button 
              className="SpacexButton"
              name="successfulAndLand"
              type="button"
              text="Fetch Land Success Missions"
              checked={this.props.successfulAndLand}
              onClick={this.props.handleCheckForLandings}
            >Filter Land Success Missions</Button>
        </div>
      </div>
    );
  }
}


export default Filter;
