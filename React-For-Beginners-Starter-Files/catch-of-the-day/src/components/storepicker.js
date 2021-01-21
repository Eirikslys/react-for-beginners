import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from "../helpers";


class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }
  myInput = React.createRef();
  goToStore = event => {
    // 1. stop the form from submitting
    event.preventDefault();
    // console.log(event);
    // 2. get the text from that input
    console.log(this.myInput.current.value);
    const storeName = this.myInput.current.value;
    // 3. change the page to the store/whatever
    this.props.history.push(`/store/${storeName}`);
  }
  // componentDidMount() {
  //   console.log("Mounted")
  //   console.log(this)
  // }
  render() {
    return (
      <Fragment>
      <p>Fish!</p>
        { /* comment */ }
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2> Please Enter A Store</h2>
          <input
            type="text"
            ref={this.myInput}
            required placeholder ="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit"> Visit Store -> </button>
        </form>
      </Fragment>
    )
  }
}

export default StorePicker;
