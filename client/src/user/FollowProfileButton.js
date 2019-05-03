import React, { Component } from "react";

// methodds
import { follow } from "./apiUser";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  render() {
    return (
      <div className="d-inline-block">
        {!this.props.following ? (
          <button
            onClick={this.followClick}
            className="btn btn-success btn-raised mr-5"
          >
            Follow
          </button>
        ) : (
          <button className="btn btn-warning btn-raised ">Unfollow</button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
