import React from 'react';
import PropTypes from 'prop-types';
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

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    // console.log(params.storeId)
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    // console.log(this.state.order)
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    )
    console.log("updated")
  };

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

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

  updateFish = (key, updatedFish) => {
    // 1. take a copy of current state
    const fishes= {...this.state.fishes};
    // 2. update that state
    fishes[key] = updatedFish;
    // 3. set that to state
    this.setState({
      fishes: fishes
    })
  }

  deleteFish = key => {
    // 1. copy the state
    const fishes = {...this.state.fishes}
    // 2. update the state
    // there is a thing with firebase where we have to set it to null to delete it, not just use delete.
    fishes[key] = null;
    // 3. update the state
    this.setState({
      fishes: fishes
    })

  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  removeFromOrder = key => {
    const order = {...this.state.order}
    delete order[key];
    this.setState({ order });
  }

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
        <Order removeFromOrder={this.removeFromOrder} fishes={this.state.fishes} order={this.state.order}/>
        <Inventory
        storeId={this.props.match.params.storeId}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}

export default App;
