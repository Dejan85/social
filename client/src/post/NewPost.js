import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// methods
import { isAuthenticated } from '../auth';
import { create } from './apiPost';

class NewPost extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      body: '',
      photo: '',
      error: '',
      user: {},
      fileSize: '',
      redirectToProfile: false
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({
      user: isAuthenticated().user
    });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;

    if (fileSize > 100000) {
      this.setState({
        error: 'File size should be less then 100kb'
      });
      return false;
    }

    if (title.length === 0 || body.length === 0) {
      this.setState({
        error: 'All field are required',
        loading: false
      });
      return false;
    }

    return true;
  };

  // handle input change
  handleChange = name => e => {
    this.setState({
      error: '',
      loading: false
    });

    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    const fileSize = name === 'photo' ? e.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({
      [name]: value,
      fileSize
    });
  };

  // submit
  clickSubmit = e => {
    e.preventDefault();

    this.setState({
      loading: true
    });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then(data => {
        if (data.error) {
          this.setState({
            error: data.error
          });
        } else {
          this.setState({
            loading: false,
            title: '',
            body: '',
            photo: '',
            redirectToProfile: true
          });
        }
      });
    }
  };

  newPostForm = (title, body) => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Profile Photo</label>
        <input
          className='form-control'
          type='file'
          accept='image/*'
          onChange={this.handleChange('photo')}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Title</label>
        <input
          className='form-control'
          type='text'
          onChange={this.handleChange('title')}
          value={title}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Body</label>
        <textarea
          className='form-control'
          type='text'
          onChange={this.handleChange('body')}
          value={body}
        />
      </div>
      <button className='btn btn-raised btn-primary' onClick={this.clickSubmit}>
        Create post
      </button>
    </form>
  );

  render() {
    const { title, body, user, error, loading, redirectToProfile } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }

    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Create a new post</h2>
        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
        {loading ? (
          <div className='jumbotron text-center'>
            <h2>Loading...</h2>
          </div>
        ) : (
          ''
        )}
        {this.newPostForm(title, body)}
      </div>
    );
  }
}

export default NewPost;
