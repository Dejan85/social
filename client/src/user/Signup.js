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

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
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
                    <button className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup;