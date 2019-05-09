import React, { Component } from 'react';
import { singlePost } from './apiPost';

class SinglePost extends Component {
  constructor() {
    super();

    this.state = {
      post: ''
    };
  }

  componentDidMount() {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data
        });
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Signle Post</h2>
        {JSON.stringify(this.state.post)}
      </div>
    );
  }
}

export default SinglePost;
