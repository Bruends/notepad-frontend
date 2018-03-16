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
    const color = (type === 'error')
      ? '#EB5757'
      : '#6FCF97'
  
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

