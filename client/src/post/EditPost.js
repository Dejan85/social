import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DefaultPostImage from '../images/postImage.gif';

// methods
import { singlePost, update } from './apiPost';
import { isAuthenticated } from '../auth';

class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      body: '',
      redirectToProfile: false,
      error: '',
      fileSize: 0,
      loading: false
    };
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

  init = postId => {
    singlePost(postId)
      .then(data => {
        if (data.error) {
          this.setState({ redirectToProfile: true });
        } else {
          this.setState({
            id: data._id,
            title: data.title,
            body: data.body,
            error: ''
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
  }

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
      const postId = this.state.id;
      const token = isAuthenticated().token;

      update(postId, token, this.postData).then(data => {
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

  editPostForm = (title, body) => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Post Photo</label>
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
        Update post
      </button>
    </form>
  );

  render() {
    const { id, title, body, redirectToProfile, error, loading } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>{title}</h2>

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

        <img
          style={{ height: '200px', width: 'auto' }}
          className='img-thumbnail'
          src={`http://localhost:8080/post/photo/${id}?${new Date().getTime()}`}
          onError={i => (i.target.src = `${DefaultPostImage}`)}
          alt={title}
        />
        {this.editPostForm(title, body)}
      </div>
    );
  }
}

export default EditPost;
