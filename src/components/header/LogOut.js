import React from "react";



class LogOut extends React.Component {
  handleClick = () => {
    localStorage.clear();
    // window.location.reload()
  };
  render() {
    return (
      <a href="/" onClick={this.handleClick} className="item">
        Log Out
      </a>
    );
  }
}

export default LogOut
