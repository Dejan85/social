import React, { Component } from 'react';

class Signup extends Component {
    constructor() {
        super()

        this.state = {
            name: "",
            email: "",
            password: "",
            error: ""
        }
    }

    // register user
    signup = (user) => {
        return fetch("http://localhost:8080/signup", {
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
        const { name, email, password } = this.state;
        const user = {
            name, email, password
        };
        this.signup(user)
            .then((data) => {
                if (data.error) {
                    this.setState({
                        error: data.error
                    });
                } else {
                    this.setState({
                        error: "",
                        name: "",
                        email: "",
                        password: ""
                    })
                }
            });
    };



    render() {
        const { name, email, password } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
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
                    <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Submit</button>
                </form>
            </div>
        )
    };
};

export default Signup;