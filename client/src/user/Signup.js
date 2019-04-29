import React, { Component } from 'react';

class Signup extends Component {
    constructor() {
        super()

        this.state = {
            name: "",
            email: "",
            passwrod: "",
            error: ""
        }
    }
    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input className="form-control" type="password" />
                    </div>
                    <button className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup;