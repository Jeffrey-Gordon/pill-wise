import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import DrugLinks from "../Components/DrugLinks.js";
import styles from "./Home.module.css";
import girl from "../Img/Home/girl.png";
import calendar from "../Img/Home/calendar.png";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugs: [],
            searchTerm: "",
            filteredDrugs: [],
            popularSearches: ["fever", "pain", "anxiety", "allergy", "inflammation", "high blood pressure"],
            activeButtonIndex: null, // To track the active button index
        };
    }

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/Jeffrey-Gordon/drug_API/main/drugs.json')
        .then(response => response.json())
        .then(data => this.setState({ drugs: data, filteredDrugs: data }))
        .catch(error => console.error("Error fetching data:", error));
    }

    handleSearch = (searchTerm) => {
        const { drugs } = this.state;

        const filteredDrugs = drugs.filter(drug =>
            drug.DrugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            drug.Indications.toLowerCase().includes(searchTerm.toLowerCase()) ||
            drug.ActiveIngredient.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({ searchTerm, filteredDrugs });
    };

    handleButtonClick = (index) => {
        this.setState({ activeButtonIndex: index });
        this.handleSearch(this.state.popularSearches[index]);
    };

    render() {
        const { location } = this.props;
        const { searchTerm, filteredDrugs, popularSearches, activeButtonIndex } = this.state;
        const username = location.state ? location.state.username : null;

        return (
        <div className={styles.maincontainer}>
            <div className={styles.buttoncontainer} style={{ marginTop: "10%" }}>
            {username ? (
                <button><Link to="/calendar"><img src={calendar} alt="calendar"></img></Link></button>
            ) : (
                <Link to="/login">
                    <button>
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
                <title className={styles.titles}>
                    <h2>Welcome</h2>
                    <h2>{username && <p>{username}</p>}</h2>
                </title>
                <img className={styles.decoImg} style={{ top: 0 }} src={girl} alt="girl"></img>
            </div>

            <div className={`${styles.blockbar} ${styles.input}`} style={{marginBottom: "1vh", borderRadius: "10px"}}>
                <p>Write your reminder logic here</p>
            </div>

            <input
                className={`${styles.blockbar} ${styles.input}`}
                type="text"
                placeholder="&#8981; Name/Indications/Ingredient"
                value={searchTerm}
                onChange={(e) => this.handleSearch(e.target.value)}
            />

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

            <DrugLinks drugs={filteredDrugs} />
        </div>
        );
    }
}

export default withRouter(Home);
