import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import DefaultPostImage from '../images/postImage.gif';

// methods
import { isAuthenticated } from '../auth';
import { singlePost, remove, like, unlike } from './apiPost';

class SinglePost extends Component {
  constructor() {
    super();

    this.state = {
      post: '',
      redirectToHome: false,
      like: false,
      likes: 0
    };
  }

  checkLike = likes => {
    const userId = isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes)
        });
      }
    });
  }

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;

    remove(postId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm('Are you sure want to delete your account?');
    if (answer) {
      this.deletePost();
    }
  };

  likeToggle = () => {
    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;

    callApi(userId, token, postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length
        });
      }
    });
  };

  renderPost = post => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
    const posterName = post.postedBy ? post.postedBy.name : ' Unknown';

    const { like, likes } = this.state;

    return (
      <div className='card-body'>
        <img
          src={`http://localhost:8080/post/photo/${post._id}`}
          alt={post.title}
          onError={index => (index.target.src = `${DefaultPostImage}`)}
          className='img-thumbnail mb-3'
          style={{ height: '300px', width: '100%', objectFit: 'cover' }}
        />

        {like ? (
          <h3 onClick={this.likeToggle}>
            <i
              className='fa fa-thumbs-up text-success bg-dark'
              style={{ padding: '10px', borderRadius: '50%' }}
            />{' '}
            {likes} Like
          </h3>
        ) : (
          <h3 onClick={this.likeToggle}>
            <i
              className='fa fa-thumbs-up text-warning bg-dark'
              style={{ padding: '10px', borderRadius: '50%' }}
            />
            {likes} Like
          </h3>
        )}

        <p className='card-text'>{post.body}</p>
        <br />
        <p className='font-italic mark'>
          Posted By <Link to={`${posterId}`}> {posterName} </Link>
          on {new Date(post.created).toDateString()}
        </p>
        <div className='d-inline-block'>
          <Link to={`/`} className='btn btn-raised btn-primary btn-small mr-5'>
            Back to posts
          </Link>
          {isAuthenticated().user &&
            isAuthenticated().user._id === post.postedBy._id && (
              <>
                <Link
                  to={`/post/edit/${post._id}`}
                  className='btn btn-raised btn-warning btn-small mr-5'
                >
                  Update post
                </Link>

                <button
                  onClick={this.deleteConfirmed}
                  className='btn btn-raised btn-danger'
                >
                  Delete Post
                </button>
              </>
            )}
        </div>
      </div>
    );
  };

  render() {
    const { post, redirectToHome } = this.state;

    if (redirectToHome) {
      return <Redirect to={`/`} />;
    }

    return (
      <div className='container'>
        <h2 className='display-2 mt-5 mb-5'>Signle Post</h2>
        {!post ? (
          <div className='jumbotron text-center'>
            <h2>Loading...</h2>
          </div>
        ) : (
          this.renderPost(post)
        )}
      </div>
    );
  }
}

export default SinglePost;
