import React from 'react';
import Header from "./Header.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";
import sampleFishes from "../sample-fishes"
import Fish from "./Fish.js";



class App extends React.Component {
    state = {
    fishes: {},
    order: {}
  };

  addFish = fish => {
    // 1. copy the existing state
    const fishes = {...this.state.fishes}
    // 2. add our new fish to the fishes
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object to state
    this.setState({
      fishes: fishes
    })
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="name">
          <Header tagline="Fresh Daily"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} />)}
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

export default App;
