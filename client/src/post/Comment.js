import React, { Component } from 'react';
import avatar from '../images/avatar.jpg';

// methods
import { comment, uncomment } from './apiPost';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

class Comment extends Component {
  constructor() {
    super();

    this.state = {
      text: ''
    };
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  addComment = e => {
    e.preventDefault();
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;

    comment(userId, token, postId, { text: this.state.text }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ text: '' });
        // dispatch fresh list of coment to parent (SinglePost)
        this.props.updateComments(data.comments);
      }
    });
  };

  render() {
    const { comments } = this.props;
    return (
      <div>
        <h2 className='mt-5 mb-5'>Leave a comment</h2>

        <form onSubmit={this.addComment}>
          <div className='form-group'>
            <input
              type='text'
              value={this.state.text}
              onChange={this.handleChange}
              className='form-control'
              placeholder='Leave a comment...'
            />
            <button className='btn btn-raised btn-success mt-2'>Post</button>
          </div>
        </form>
        <div className='col-md-4'>
          <h3 className='text-primary'>{comments.length} Comments</h3>
          <hr />
          {comments.map((comment, i) => {
            return (
              <div key={i}>
                <div>
                  <Link to={`/user/${comment.postedBy._id}`}>
                    <img
                      style={{
                        borderRadius: '50%',
                        border: '1px solid black',
                        width: '30px'
                      }}
                      className='float-left mr-2'
                      height='30px'
                      onError={i => (i.target.src = `${avatar}`)}
                      src={`http://localhost:8080/user/photo/${
                        comment.postedBy._id
                      }`}
                      alt={comment.postedBy.name}
                    />
                  </Link>

                  <div>
                    <p className='lead'>{comment.text}</p>

                    <p className='font-italic mark'>
                      Posted By{' '}
                      <Link to={`/user/${comment.postedBy._id}`}>
                        {' '}
                        {comment.postedBy.name}{' '}
                      </Link>
                      on {new Date(comment.created).toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Comment;
