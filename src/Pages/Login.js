import React, { Component } from "react";
import { withRouter, Link} from "react-router-dom";
import "../styles.css";
import doctor from "../Img/Login/doctor.png";
import Google from "../Img/Login/Google.png";
import Apple from "../Img/Login/Apple.png";
import Facebook from "../Img/Login/Facebook.png";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            username: "",
            password: "",
            error: "",
        };
    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleLogin = async () => {
        try {
            const { username, password } = this.state;
            // Fetch JSON array from GitHub
            const response = await fetch(
                "https://raw.githubusercontent.com/Jeffrey-Gordon/drug_API/main/accounts.json"
            );
            const data = await response.json();

            // Check if username and password match any object in the array
            const user = data.find(
                (item) =>
                    (item.username === username || item.email === username) &&
                    item.password === password
                );

            if (user) {
                this.props.history.push({
                    pathname: "/", 
                    state: { username: user.username } // Pass the username as part of the state
                });
            } else {
                this.setState({ error: "Invalid email/username or password" });
            }
        } catch (error) {
            console.error("Error:", error);
            this.setState({ error: "Error occurred while logging in" });
        }
    };

    render() {
        const { username, password, error } = this.state;

        return (
            <div className="main-container">
                <div className="container">
                    <div className="titles">
                        <h2>Login to your</h2>
                        <h2>Account</h2>
                    </div>
                    <img className="decoImg" src={doctor} alt="docter"></img>
                </div>

                <input
                    className="blockbar input"
                    type="text"
                    placeholder="&#128231; Email / Username"
                    value={username}
                    onChange={this.handleUsernameChange}
                />
                <br />
                <input
                    className="blockbar input"
                    type="password"
                    placeholder="&#128273; Enter Password"
                    value={password}
                    onChange={this.handlePasswordChange}
                />
                <br />
                <button 
                    type="button" 
                    className="blockbar button" 
                    onClick={this.handleLogin}>Login
                </button>
                {error && <p style={{ textAlign: 'center' }}>{error}</p>}

                <p style={{ textAlign: 'center', marginTop: "10vw"}}>Sign in with</p>
                <div class="button-container">
                    <button ><img src={Google} alt="Google"></img></button>
                    <button><img src={Apple} alt="Apple"></img></button>
                    <button><img src={Facebook} alt="Facebook"></img></button>
                </div>
                <p style={{ textAlign: 'center', marginTop: "10vw", fontSize: "14px"}}>Don't have an account?&nbsp;
                    <Link to="/example" style={{fontSize: "14px"}}>Sign up</Link>
                </p>

            </div>
        );
    }
}

export default withRouter(Login);
