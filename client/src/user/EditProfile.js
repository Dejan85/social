import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { read } from './apiUser';

class EditProfile extends Component {
    constructor() {
        super()

        this.state = {
            id: "",
            name: "",
            email: "",
            password: ""
        };
    };

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then((data) => {
                if (data.error) {
                    this.setState({ redirectToSignin: true });
                } else {
                    this.setState({
                        id: data._id,
                        name: data.name,
                        email: data.email
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId)
    };


    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit profile</h2>
            </div>
        );
    };
};

export default EditProfile;