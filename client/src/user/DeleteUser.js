import React, { Component } from 'react';


class DeleteUser extends Component {
    constructor() {
        super()

        this.state = {
            xad: ""
        }
    };
    render() {
        return (
            <button className="btn btn-raised btn-danger">
                Delete Profile
            </button>
        )
    }
}

export default DeleteUser;