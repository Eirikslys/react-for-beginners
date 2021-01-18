import React from 'react';
import Header from "./Header.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";


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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="name">
          <Header tagline="Fresh Daily"/>
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App;
