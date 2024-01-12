import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import DrugLinks from "../Components/DrugLinks.js";
import styles from "./Home.module.css";
import girl from "../Img/Home/girl.png";
import calendar from "../Img/Home/calendar.png";

class Home extends Component {
    constructor(props) {
        super(props);
        // Initialize state with drugs data, search term, filtered drugs, popular searches, loading, and active button index
        this.state = {
            drugs: [],
            searchTerm: "",
            filteredDrugs: [],
            popularSearches: ["fever", "pain", "anxiety", "allergy", "inflammation", "high blood pressure"],
            activeButtonIndex: null, // To track the active button index
            loading: true, // Initial loading state
            username: null,
        };
    }

    reminder(){
        // Retrieve stored strings from localStorage
        const storedItems = localStorage.getItem('calendarItems');
        // Parse the stored string into an array, or use an empty array as the default
        const items = storedItems ? JSON.parse(storedItems) : [];

        return items;
    }

    

    // Check username in localStorage andfetch drugs data from an external JSON file when the component mounts
    componentDidMount() {
        const loggedInUser = localStorage.getItem('loggedInUser');

        if (loggedInUser) {
            // If there are logged in users, update the username in the state
            this.setState({ username: loggedInUser });
        }

        fetch('https://raw.githubusercontent.com/Jeffrey-Gordon/drug_API/main/drugs.json')
            .then(response => response.json())
            .then(data => this.setState({ drugs: data, filteredDrugs: data, loading: false }))
            .catch(error => {
                console.error("Error fetching data:", error);
                this.setState({ loading: false });
            });
    }

    logOut = () =>{
        localStorage.setItem('loggedInUser', "");
        const loggedInUser = localStorage.getItem('loggedInUser');
        this.setState({ username: loggedInUser });

        localStorage.setItem('calendarItems', null);
    }

    // Event handler for searching drugs based on the entered term
    handleSearch = (searchTerm) => {
        const { drugs } = this.state;

        const filteredDrugs = drugs.filter(drug =>
            drug.DrugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            drug.Indications.toLowerCase().includes(searchTerm.toLowerCase()) ||
            drug.ActiveIngredient.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({ searchTerm, filteredDrugs });
    };

    // Event handler for handling clicks on popular search buttons
    handleButtonClick = (index) => {
        this.setState({ activeButtonIndex: index });
        this.handleSearch(this.state.popularSearches[index]);
    };

    render() {
        // Destructure props and state for easier access
        const { username } = this.state;
        const { searchTerm, filteredDrugs, popularSearches, activeButtonIndex, loading } = this.state;
        const reminderData = this.reminder() && this.reminder()[0];
        return (
            <div className={styles.maincontainer}>
                <div className={styles.buttoncontainer} style={{ marginTop: "10%" }}>
                    {/* Conditional rendering based on the existence of a username */}
                    {username ? (
                        <>
                            <button onClick={this.logOut}>
                                {/* Styled login button */}
                                <span
                                    style={{
                                        color: "#007cee",
                                        backgroundColor: "#ddd",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <i>&nbsp;Logout&nbsp;&nbsp;</i>
                                </span>
                            </button>
                            <button><Link to="/calendar"><img src={calendar} alt="calendar"></img></Link></button>
                        </>
                    ) : (
                        <Link to="/login">
                            <button>
                                {/* Styled login button */}
                                <span
                                    style={{
                                        color: "#007cee", 
                                        backgroundColor: "#ddd",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <i>&nbsp;Login&nbsp;&nbsp;</i>
                                </span>
                            </button>
                        </Link>
                    )}
                </div>

                <div className={styles.container} style={{ marginTop: "0vh", height: "15vh" }}>
                    {/* Display welcome message and username (if available) */}
                    <title className={styles.titles}>
                        <h2>Welcome</h2>
                        <h2>{username && <p>{username}</p>}</h2>
                    </title>
                    {/* Decorative image */}
                    <img className={styles.decoImg} style={{ top: 0 }} src={girl} alt="girl"></img>
                </div>

                {/* Placeholder block for reminder logic */}
                <div className={`${styles.blockbar} ${styles.input}`} style={{marginBottom: "1vh", borderRadius: "10px"}}>
                <p style={{fontSize: "4vw", padding: "2vw"}}>
                    reminder: {reminderData ? reminderData.drugName : "drug"},&nbsp;
                    {reminderData ? reminderData.hour : "hh"}
                    :
                    {reminderData ? reminderData.minute : "mm"} 
                </p>

                </div>

                {/* Search input field */}
                <input
                    className={`${styles.blockbar} ${styles.input}`}
                    type="text"
                    placeholder="&#8981; Name/Indications/Ingredient"
                    value={searchTerm}
                    onChange={(e) => this.handleSearch(e.target.value)}
                />

                {/* Display popular search buttons with styling based on the active button */}
                <div style={{ maxWidth: "100%", overflowX: "scroll", whiteSpace: "nowrap", WebkitOverflowScrolling: "touch" }}>
                    {popularSearches.map((search, index) => (
                        <button
                            key={index}
                            onClick={() => this.handleButtonClick(index)}
                            className={styles.popularsearches}
                            style={{
                                margin: "1vw",
                                backgroundColor: activeButtonIndex === index ? "#007cee" : "initial",
                                color: activeButtonIndex === index ? "white" : "#999",
                            }}
                        >
                            {search}
                        </button>
                    ))}
                </div>

                {/* Render DrugLinks component with filtered drugs */}
                {loading ? "Loading data..." : <DrugLinks drugs={filteredDrugs} />}
            </div>
        );
    }
}

// Wrap the component with withRouter to have access to the history object
export default withRouter(Home);
