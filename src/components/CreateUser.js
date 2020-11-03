import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    
    state = {
        users: [],
        username: ''
    }

    getUsers = async () => {
        const res = await axios.get(process.env.REACT_APP_USERSAPI);
        this.setState({users: res.data});
    }

    async componentDidMount() {
        this.getUsers();
    }

    onChangeUsername = (e) => {
        this.setState({username: e.target.value});
    }

    onSubmitUser = async (e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_USERSAPI, {
            username: this.state.username
        });
        this.setState({username: ''})
        this.getUsers()
    }

    deleteUser = async (id) => {
        await axios.delete(`${process.env.REACT_APP_USERSAPI}/${id}`);
        this.getUsers()
    }

    render() {
        return (
            <>
                <div className="card card-body">
                    <h3>Create New User</h3>
                    <form onSubmit={this.onSubmitUser} className="form-group">
                        <input value={this.state.username} type="text" className="form-control" placeholder="Username" onChange={this.onChangeUsername} />
                        <button type="submit" className="btn btn-primary mt-2">Guardar</button>
                    </form>
                </div>

                <ul className="list-group mt-3">
                    <h2>Users List</h2>
                    {
                        this.state.users.map((user) => (
                            <li className="list-group-item list-group-item-action" key={user._id} onDoubleClick={() => this.deleteUser(user._id)}>
                                {user.username}
                            </li>
                        ))
                    }
                </ul>
            </>
        )
    }
}
