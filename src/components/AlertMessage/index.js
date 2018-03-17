import React, { Component } from 'react';
import './alertMessage.css'

class AlertMessage extends Component {
  constructor(props){
    super();
    this.state = {
      isVisible: false,
    }

    this.alertStyle = this.alertStyle.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isVisible){
      this.showAlert();
    }
  }

  showAlert(){
    this.setState({ isVisible: true });
    setTimeout(() => {
      this.setState({ isVisible: false })
    }, 2000);
  }

  alertStyle() {
    const { type } = this.props;
    // default color
    let color = '#2D9CDB';

    //setting message color by type
    if(type === 'success') color = '#6FCF97';
    else if (type === 'error') color = '#EB5757';    
    
    // seting visibility
    const display = (this.state.isVisible)
      ? 'block'
      : 'none'

    return {
      display,
      backgroundColor: color,
    };
  }

  render() {
    return (
      <div style={this.alertStyle()} 
        className="alertMessage">
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default AlertMessage;

