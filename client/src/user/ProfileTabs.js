import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../images/avatar.jpg';

class ProfileTabs extends Component {
  render() {
    const { following, followers } = this.props;

    return (
      <div>
        <div className='row'>
          <div className='col-md-4'>
            <h3 className='text-primary'>Followers</h3>
            <h3 />
            {followers.map((person, i) => {
              return (
                <div key={i}>
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        style={{
                          borderRadius: '50%',
                          border: '1px solid black',
                          width: '30px'
                        }}
                        className='float-left mr-2'
                        height='30px'
                        onError={i => (i.target.src = `${avatar}`)}
                        src={`http://localhost:8080/user/photo/${person._id}`}
                        alt={person.name}
                      />
                      <div>
                        <p className='lead'>{person.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='col-md-4'>
            <h3 className='text-primary'>following</h3>
            {following.map((person, i) => {
              return (
                <div key={i}>
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        style={{
                          borderRadius: '50%',
                          border: '1px solid black',
                          width: '30px'
                        }}
                        className='float-left mr-2'
                        height='30px'
                        onError={i => (i.target.src = `${avatar}`)}
                        src={`http://localhost:8080/user/photo/${person._id}`}
                        alt={person.name}
                      />
                      <div>
                        <p className='lead'>{person.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
