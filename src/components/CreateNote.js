import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: '',
    title: '',
    content: '',
    date: new Date(),
    editing: false,
    _id: ''
  };

  async componentDidMount() {
    const res = await axios.get(process.env.REACT_APP_USERSAPI);
    this.setState({
        users: res.data.map((user) => user.username),
        userSelected: res.data[0].username
    });

    if (this.props.match.params.id) {
      const res = await axios.get(`${process.env.REACT_APP_NOTESAPI}/${this.props.match.params.id}`);
      this.setState({
        title: res.data.title,
        content: res.data.content,
        userSelected: res.data.author,
        date: new Date(res.data.date),
        editing: true,
        _id: this.props.match.params.id
      });
    }
  }

  onInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
    e.preventDefault();
  };

  onChangeDate = (date) => {
      this.setState({date})
  }


  onSubmit = async (e) => {
      e.preventDefault();
      const newNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.userSelected,
        date: this.state.date
      }

      if (this.state.editing) {
        await axios.put(`${process.env.REACT_APP_NOTESAPI}/${this.state._id}` , newNote);
      }else{
        await axios.post(process.env.REACT_APP_NOTESAPI, newNote);
      }     
      window.location.href = '/';
  }

  render() {
    return (
      <>
        <div className="card card-body">
          <h4>Create a Note</h4>
          <div className="form-grpup">
            <select className="form-control mb-2" name="userSelected" onChange={this.onInputChange} value={this.state.userSelected}>
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={this.onSubmit} action="">
            <div className="form-group">
                <input type="text" className="form-control mb-2" placeholder="Title" name="title" onChange={this.onInputChange} value={this.state.title} required />
                <textarea name="content" className="form-control mb-2" rows="7" id="" placeholder="Content" onChange={this.onInputChange} value={this.state.content} required></textarea>
                <DatePicker className="form-control mb-2" selected={this.state.date} onChange={this.onChangeDate} required />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </>
    );
  }
}
