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


    // handle input change
    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        });
    };

    // submit 
    clickSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name, email, password
        };
        console.log(user);
        // signup(user)
        //     .then((data) => {
        //         if (data.error) {
        //             this.setState({
        //                 error: data.error
        //             });
        //         } else {
        //             this.setState({
        //                 error: "",
        //                 name: "",
        //                 email: "",
        //                 password: "",
        //                 open: true
        //             });
        //         };
        //     });
    };

    signupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input className="form-control" type="text" onChange={this.handleChange("name")} value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input className="form-control" type="text" onChange={this.handleChange("email")} value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input className="form-control" type="password" onChange={this.handleChange("password")} value={password} />
            </div>
            <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Update</button>
        </form>
    )

    render() {
        const { name, email } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit profile</h2>
                {this.signupForm(name, email)}
            </div>
        );
    };
};

export default EditProfile;