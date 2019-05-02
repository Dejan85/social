import React, { Component } from 'react';

class FolowProfileButton extends Component {
    render() {
        return (
            <div className="d-inline-block">
                <button className="btn btn-success btn-raised mr-5">
                    Folow
                </button>
                <button className="btn btn-warning btn-raised ">
                    Unfolow
                </button>
            </div>
        )
    }
};

export default FolowProfileButton;