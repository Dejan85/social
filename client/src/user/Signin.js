import React, { Component } from 'react';

class Signin extends Component {
    constructor() {
        super()

        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false
        };
    };

    // register user
    signin = (user) => {
        return fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then((res) => {
                return res.json();
            })
            .catch((err) => {
                console.log(err);
            })
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
        const { email, password } = this.state;
        const user = {
            email, password
        };
        this.signin(user)
            .then((data) => {
                if (data.error) {
                    this.setState({
                        error: data.error
                    });
                } else {
                    // authenticate
                    // redirect
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
        const { email, password, error, open } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                    {/* {open} */}
                    New account is successfuly created. Please Sign In.
                </div>
                {this.signinForm(email, password)}
            </div>
        )
    };
};

export default Signin;