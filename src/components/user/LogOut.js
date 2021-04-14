import { logOut } from "../../actions";
import  React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class LogOut extends React.Component {

     handleClick = () => {
        localStorage.clear()
        this.props.logOut()
    }
    render() {
        return (
            <Link to="/account/login"
            onClick={this.handleClick} 
            className="item">
                Log Out
            </Link>
        )
    }
}

export default connect(null, { logOut })(LogOut)