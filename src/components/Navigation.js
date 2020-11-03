import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {

  state = {
    navState: true
  }

  changeNavState = () => this.setState({navState: !this.state.navState})

  render() {
    return (
      <nav id="navbarNav" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            NotesApp
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={!this.state.navState ? true : false}
            aria-label="Toggle navigation"
            onClick={this.changeNavState}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Notes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Note</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user">User</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
