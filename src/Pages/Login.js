import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import styles from "./Login.module.css";
import doctor from "../Img/Login/doctor.png";
import Google from "../Img/Login/Google.png";
import Apple from "../Img/Login/Apple.png";
import Facebook from "../Img/Login/Facebook.png";

class Login extends Component {
    constructor(props) {
        super(props);
        // Initialize state with email, username, password, loading, and error
        this.state = {
            email: "",
            username: "",
            password: "",
            loading: false,
            error: "",
        };
    }

    // Event handler for updating the username state
    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    // Event handler for updating the password state
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    // Async function to handle the login logic
    handleLogin = async () => {
        try {
            const { username, password } = this.state;

            // Set loading to true during login attempt
            this.setState({ loading: true, error: "" });

            // Fetch JSON array from GitHub containing user accounts
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
                //Store username in localStorage
                localStorage.setItem('loggedInUser', user.username);
                // Redirect to the home page with the username as part of the state
                this.props.history.push({
                    pathname: "/",
                    state: { username: user.username },
                });
            } else {
                // Set an error message if login credentials are invalid
                this.setState({ error: "Invalid email/username or password" });
            }
        } catch (error) {
            // Log and display an error message if an exception occurs during login
            console.error("Error:", error);
            this.setState({ error: "Error occurred while logging in" });
        } finally {
            // Set loading back to false after login attempt is completed
            this.setState({ loading: false });
        }
    };

    render() {
        // Destructure state for easier access
        const { username, password, loading, error } = this.state;

        return (
            <div className={styles.maincontainer}>
                <Link to="/" style={{fontSize: "2vh", textDecoration: "none"}}>
                    <p></p>
                    <span
                        style={{
                            color: "#007cee",
                            backgroundColor: "#ddd",
                            borderRadius: "10px",
                        }}
                    >
                        <i>&nbsp;&lt;Back&nbsp;&nbsp;</i>
                    </span>
                </Link>

                <div className={styles.container}>
                    <div className={styles.titles}>
                        <h2>Login to your Account</h2>
                    </div>
                    <img className={styles.decoImg} src={doctor} alt="doctor"></img>
                </div>

                {/* Input field for email/username */}
                <input
                    className={`${styles.blockbar} ${styles.input}`}
                    type="text"
                    placeholder="&#128231; Email / Username"
                    value={username}
                    onChange={this.handleUsernameChange}
                />
                <br />
                {/* Input field for password */}
                <input
                    className={`${styles.blockbar} ${styles.input}`}
                    type="password"
                    placeholder="&#128273; Enter Password"
                    value={password}
                    onChange={this.handlePasswordChange}
                />
                <br />
                {/* Button to trigger the login logic */}
                <button
                    type="button"
                    className={`${styles.blockbar} ${styles.button}`}
                    onClick={this.handleLogin}
                    disabled={loading} // Disable button during loading
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                {/* Display error message if present */}
                {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

                <p style={{ textAlign: "center", marginTop: "10vw" }}>
                    Sign in with
                </p>
                {/* Container for social login buttons */}
                <div className={styles.buttoncontainer}>
                    <button>
                        <img src={Google} alt="Google"></img>
                    </button>
                    <button>
                        <img src={Apple} alt="Apple"></img>
                    </button>
                    <button>
                        <img src={Facebook} alt="Facebook"></img>
                    </button>
                </div>
                {/* Link to the sign-up page */}
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "10vw",
                        fontSize: "14px",
                    }}
                >
                    Don't have an account?&nbsp;
                    <Link to="/example" style={{ fontSize: "14px" }}>
                        Sign up
                    </Link>
                </p>
            </div>
        );
    }
}

// Wrap the component with withRouter to have access to the history object
export default withRouter(Login);
