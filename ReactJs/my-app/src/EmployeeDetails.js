import React, { Component } from 'react';

export default class EmployeeDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employeeName: '',
            location: '',
            displayInfo: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleButtonClick() {
        this.setState({
            displayInfo: true
        });
    }

    render() {
        const { employeeName, location, displayInfo } = this.state;
        
        return (
            <div>
                <h1>Employee Details</h1>
                <div>
                    <label>
                        Enter Employee Name: 
                        <input
                            type="text"
                            name="employeeName"
                            value={this.state.employeeName}
                            onChange={this.handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Enter Location: 
                        <input
                            type="text"
                            name="location"
                            value={this.state.location}
                            onChange={this.handleInputChange}
                        />
                    </label>
                </div>
                <button onClick={this.handleButtonClick}>Submit</button>

                {displayInfo && (
                    <div>
                        <h2>Employee Information</h2>
                        <p>Employee Name: {employeeName}</p>
                        <p>Location: {location}</p>
                    </div>
                )}
            </div>
        );
    }
}
