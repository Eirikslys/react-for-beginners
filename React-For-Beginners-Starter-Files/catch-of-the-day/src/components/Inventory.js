import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from "../base";
import firebase from 'firebase'


class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    deleteFish: PropTypes.func,
    updateFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    addFish: PropTypes.func,
  }

  // you can create state that is local to a component if it's only used in that component.
  state = {
    uid: null,
    owner: null,
  }

  componentDidMount() {
    // Last thing, when we refresh it should check if we are logged in:
    // Every time we try to load the page firebase will see if we are logged in and authetnticated,
    // if we are it will pass us a user we can give to the authhandler, which will in turn do all the checks.
    // now for a split second we see the login buttons. Could also have a loading state
    // where if loading is true you do not show the buttons
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({user});
      }
    })
  }

  authHandler = async authData => {
    //  1. look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, {context: this} );
    console.log(store)
    // 2. claim it if there is no owner, if we are the first we are likely the owner
    if (!store.owner) {
      // save as own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    //  3. set the state of the inventory component to reflect the current owner.
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
    console.log(authData);
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
    .auth()
    .signInWithPopup(authProvider)
    .then(this.authHandler);
  }

  logout = async () => {
    console.log("logging out");
    await firebase.auth().signOut();
    this.setState({uid: null})
  }

  render() {
    const logout = <button onClick={this.logout}>Log out</button>
    // 1. check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate = {this.authenticate} />;
    }

    // 2. check if they are not the owner
    if (this.state.uid !== this.state.owner)
      return (
        <div><p>Sorry you are not the owner</p>

        {logout}
        </div>
      )
    // 3. they must be the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm deleteFish={this.props.deleteFish} updateFish={this.props.updateFish} index={key} key={key} fish={this.props.fishes[key]} />
          ))}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick= {this.props.loadSampleFishes}> Load Sample Fishes</button>
        {logout}
      </div>
    )
  }
}

export default Inventory
