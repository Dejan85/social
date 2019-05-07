import React, { Component } from 'react';

// methods
import { follow, unfollow } from './apiUser';

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

  render() {
    return (
      <div className='d-inline-block'>
        {!this.props.following ? (
          <button
            className='btn btn-success btn-raised mr-5'
            onClick={this.followClick}
          >
            Follow
          </button>
        ) : (
          <button
            className='btn btn-warning btn-raised'
            onClick={this.unfollowClick}
          >
            Unfollow
          </button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
