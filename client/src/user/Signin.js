import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// methods
import { signin, authenticate } from '../auth/';

class Signin extends Component {
    constructor() {
        super()

        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        };
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
        this.setState({
            loading: true
        });
        const { email, password } = this.state;
        const user = {
            email, password
        };
        signin(user)
            .then((data) => {
                if (data.error) {
                    this.setState({
                        error: data.error,
                        loading: false
                    });
                } else {
                    // authenticate
                    authenticate(data, () => {
                        this.setState({
                            redirectToReferer: true
                        });
                    });
                };
            });
    };

    signinForm = (email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input className="form-control" type="text" onChange={this.handleChange("email")} value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input className="form-control" type="password" onChange={this.handleChange("password")} value={password} />
            </div>
            <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Submit</button>
        </form>
    )


    render() {
        const { email, password, error, redirectToReferer, loading } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : ""}
                {this.signinForm(email, password)}
            </div>
        )
    };
};

export default Signin;