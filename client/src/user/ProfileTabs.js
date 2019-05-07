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
                  <div className='row'>
                    <div>
                      <Link to={`/user/${person._id}`}>
                        <img
                          className='float-left mr-2'
                          height='30px'
                          onError={i => (i.target.src = `${avatar}`)}
                          src={`http://localhost:8080/user/photo/${person._id}`}
                          alt={person.name}
                        />
                        <div>
                          <h3>{person.name}</h3>
                        </div>
                      </Link>
                      <p style={{ clear: 'both' }}>{person.about}</p>
                    </div>
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
