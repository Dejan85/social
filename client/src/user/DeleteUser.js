import React, { Component } from 'react';


class DeleteUser extends Component {
    constructor() {
        super()

        this.state = {
            xad: ""
        };
    };

    deleteAccount = () => {
        console.log("Delete accout");
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure want to delete your account?")
        if (answer) {
            this.deleteAccount();
        }
    }

    render() {
        return (
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                Delete Profile
            </button>
        )
    };
};

export default DeleteUser;