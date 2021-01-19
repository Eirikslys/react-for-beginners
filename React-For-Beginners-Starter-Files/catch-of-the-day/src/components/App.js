import React from 'react';
import Header from "./Header.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";
import sampleFishes from "../sample-fishes"
import Fish from "./Fish.js";
import base from '../base';


class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    console.log(params.storeId)
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    console.log(this.state.order)
    console.log("updated")
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

  addToOrder = key => {
    // 1. copy the existing state
    const order = {...this.state.order}
    // 2. add to order or update number in our order
    order[key] = order[key] +1 || 1;
    // 3. call setState to update
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="name">
          <Header tagline="Fresh Daily"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key =>
              <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
            )}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

export default App;
