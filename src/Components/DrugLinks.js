import React from "react";
import { Link } from "react-router-dom";
import styles from "./DrugLinks.module.css";

// DrugLinks component receives a prop 'drugs' which is an array of drug objects
const DrugLinks = ({ drugs }) => {
    // Helper function to render drug indications as paragraphs
    const renderIndications = (Indications) => {
        // If Indications is not provided, return null
        if (!Indications) return null;

        // Split Indications into an array and map each item to a paragraph
        const IndicationsArray = Indications.split(',').map((item, index) => (
            <p key={index}><span>{item.trim()}</span></p>
        ));

        return IndicationsArray;
    };

    return (
        <div className={styles.DrugLinks}>
            {/* Map through the drugs array and create links for each drug */}
            {drugs.map((drug) => (
                <Link
                    // Link to the individual drug's page with its ID and state
                    to={{
                        pathname: `/drug/${drug.ID}`,
                        state: { drug },
                    }}
                    key={drug.ID}
                    className={styles.DrugLink}
                >
                    {/* Display drug image */}
                    <img src={drug.Image} alt={drug.DrugName} />
                    {/* Display drug name */}
                    <h3>{drug.DrugName}</h3>
                    {/* Render drug indications using the helper function */}
                    {renderIndications(drug.Indications)}
                </Link>
            ))}
        </div>
    );
};

export default DrugLinks;
