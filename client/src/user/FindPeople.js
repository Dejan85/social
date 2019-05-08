import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import imagesProfile from '../images/avatar.jpg'

// methods
import { findPeople, follow } from '../user/apiUser';
import { isAuthenticated } from '../auth';

class FindPeople extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      error: '',
      open: false,
      followMessage: ''
    };
  }

  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    findPeople(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          users: data
        });
      }
    });
  }

  clickFollow = (user, index) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, user._id).then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        });
      } else {
        let toFollow = this.state.users;
        toFollow.splice(index, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}`
        });
      }
    });
  };

  renderUsers = users => (
    <div className='row'>
      {users.map((user, index) => {
        return (
          <div className='card col-md-4' key={index}>
            <img
              src={`http://localhost:8080/user/photo/${user._id}`}
              alt={user.name}
              style={{ height: '200px', width: 'auto' }}
              className='img-thumbnail'
              // onError={i => (i.target.src = `${DefaultProfile}`)}
            />

            <div className='card-body'>
              <h5 className='card-title'>{user.name}</h5>
              <p className='card-text'>{user.email}</p>
              <Link
                to={`/user/${user._id}`}
                className='btn btn-raised btn-primary btn-small'
              >
                View Profile
              </Link>

              <button
                onClick={() => {
                  this.clickFollow(user, index);
                }}
                className='btn btn-raised btn-info float-right btn-sm'
              >
                Follow
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  render() {
    const { users, open, followMessage } = this.state;
    console.log(open);
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Find People</h2>

        {open && (
          <div className='alert alert-success'>
            <p>{followMessage}</p>
          </div>
        )}

        {this.renderUsers(users)}
      </div>
    );
  }
}

export default FindPeople;
