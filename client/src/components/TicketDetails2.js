import React from 'react';

export default class TicketDetails2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    id: props.id,
    title:"",
    description: "",
    assignedProject: "",
    assignedDeveloper: "",
    priority: "",
    type: "",
    status: ""
    }
  }



  updateTitle(event) {
    this.setState({
      title: event.target.value 
    });
  }

  updateDescription(event) {
    this.setState({
      description: event.target.value 
    });
  }

  updateAssignedProject(event) {
    this.setState({
       assignedProject: event.target.value 
    });
  }

  updateAssignedDeveloper(event) {
    this.setState({
       assignedDeveloper: event.target.value 
    });
  }

  updatePriority(event) {
    this.setState({
       priority: event.target.value 
    });
  }

  updateType(event) {
    this.setState({
       type: event.target.value 
    });
  }

  updateStatus(event) {
    this.setState({
       status: event.target.value 
    });
  }

  render() {
    return (
      <div>
        First Name:
        <input type="text" value={this.state.title} onChange={this.updateTitle.bind(this)} />
        Last Name:
        <input type="text" value={this.state.description} onChange={this.updateDescription.bind(this)} />
        <input type="text" value={this.state.assignedProject} onChange={this.updateAssignedProject.bind(this)} />
        <input type="text" value={this.state.assignedDeveloper} onChange={this.updateAssignedDeveloper.bind(this)} />
        <input type="text" value={this.state.priority} onChange={this.updatePriority.bind(this)} />
        <input type="text" value={this.state.type} onChange={this.updateType.bind(this)} />
        <input type="text" value={this.state.status} onChange={this.updateStatus.bind(this)} />
        <hr/>

        <button>
           Save
        </button>
      </div>
    );
  }
}

