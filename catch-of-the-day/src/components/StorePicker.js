import React from "react";

class StorePicker extends React.Component {
  myInput = React.createRef();
  constructor() {
    super();
    console.log("gonna create a component;");
    // change 'this' to StorePicker
    // this.goToStore = this.goToStore.bind(this);
  }

  // set as a property
  goToStore = (event) => {
    // stop the form from submitting
    event.preventDefault();

    // get the text from the input
    const storeName = this.myInput.current.value;

    // change the page to /store/whatever-they-enter
    // console.log("going to store");
    this.props.history.push(`/store/${storeName}`);
  };
  // componentDidMount() {
  //   console.log("Mounted!!");
  //   console.log(this);
  // }
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store: </h2>

        <input
          ref={this.myInput}
          type="text"
          required
          placeholder="Store Name"
        ></input>
        <button type="submit"> Visit Store </button>
      </form>
    );
  }
}

export default StorePicker;
