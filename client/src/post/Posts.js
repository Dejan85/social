import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import imagesProfile from '../images/avatar.jpg'

// methods
import { list } from '../post/apiPost';

class Posts extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          posts: data
        });
      }
    });
  }

  renderPosts = posts => (
    <div className='row'>
      {posts.map((post, index) => {
        return (
          <div className='card col-md-4' key={index}>
            <div className='card-body'>
              <h5 className='card-title'>{post.title}</h5>
              <p className='card-text'>{post.body}</p>
              <Link
                to={`/posts/${post._id}`}
                className='btn btn-raised btn-primary btn-small'
              >
                Read more
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );

  render() {
    const { posts } = this.state;
    console.log(posts);
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Recent Post</h2>
        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
