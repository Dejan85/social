import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// methods
import { isAuthenticated } from '../auth';
import { read, update } from './apiUser';


class EditProfile extends Component {
    constructor() {
        super()

        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false,
            error: "",
            loading: false
        };
    };

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then((data) => {
                if (data.error) {
                    this.setState({ redirectToProfile: true });
                } else {
                    this.setState({
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        error: ""
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId)
    };

    isValid = () => {
        const { name, email, password } = this.state;

        if (name.length === 0) {
            this.setState({
                error: "Name is required"
            })
            return false;
        };

        if (!/^\w+([.-]?\w+)*@\w([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({
                error: "A valid email is required"
            })
            return false;
        };

        if (password.length >= 1 && password.length <= 5) {
            this.setState({
                error: "Password must be at least 6 characters long"
            })
            return false;
        };
        return true;
    };


    // handle input change
    handleChange = (name) => (e) => {
        const value = name === "photo" ? e.target.files[0] : e.target.value
        this.userData.set(name, value);
        this.setState({
            [name]: value
        });
    };

    // submit 
    clickSubmit = (e) => {
        e.preventDefault();

        this.setState({
            loading: true
        });

        if (this.isValid()) {
            // const { name, email, password } = this.state;
            // const user = {
            //     name, email, password
            // };
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            update(userId, token, this.userData)
                .then((data) => {
                    if (data.error) {
                        this.setState({
                            error: data.error
                        });
                    } else {
                        this.setState({
                            redirectToProfile: true
                        });
                    };
                });
        };
    };

    signupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input className="form-control" type="file" accept="image/*" onChange={this.handleChange("photo")} />
            </div>
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
        const { id, name, email, password, redirectToProfile, error, loading } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit profile</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : ""}
                {this.signupForm(name, email, password)}
            </div>
        );
    };
};

export default EditProfile;