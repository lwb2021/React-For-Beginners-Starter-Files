import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };
  addFish = (fish) => {
    console.log("adding a fish!");
    // take a copy of existing state
    const fishes = { ...this.state.fishes };

    // add new fish to the fish variable
    fishes[`fish${Date.now()}`] = fish;

    // set the new fish object to state to overwrite the existing state
    this.setState({
      fishes: fishes, // or fishes in ES6
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. take a copy of current state
    const fishes = { ...this.state.fishes };
    // 2. update that state
    fishes[key] = updatedFish;
    // 3. set that to state
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  componentDidMount() {
    console.log("MOUNTED!!");
    const params = this.props.match.params;
    const localStorageRef = localStorage.getItem(params.storeId);
    console.log(" localStorageRef ", localStorageRef);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    console.log("UPDATING!!");
    const params = this.props.match.params;
    localStorage.setItem(`${params.storeId}`, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    console.log("UNMOUNTING!!");
    base.removeBinding(this.ref);
  }

  addToOrder = (key) => {
    // 1. take a copy of the state
    const order = { ...this.state.order };
    // 2. either add to the order or update the number in the order
    order[key] = order[key] + 1 || 1;
    // 3. call setState to update the state
    this.setState({ order: order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" age={100} />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key} // need to pass as index since 'key' is not accessible
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>

        <Order fisher={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
