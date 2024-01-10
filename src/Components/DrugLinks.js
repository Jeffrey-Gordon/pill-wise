import React from "react";
import { Link } from "react-router-dom";
import styles from "./DrugLinks.module.css";

const DrugLinks = ({ drugs }) => {
    const renderContraindications = (Indications) => {
        if (!Indications) return null;
    
        const IndicationsArray = Indications.split(',').map((item, index) => (
            <p key={index}><span>{item.trim()}</span></p>
        ));
    
        return IndicationsArray;
    };

    return (
        <div className={styles.DrugLinks}>
            {drugs.map((drug) => (
            <Link
                to={{
                pathname: `/drug/${drug.ID}`,
                state: { drug },
                }}
                key={drug.ID}
                className={styles.DrugLink}
            >
                <img src={drug.Image} alt={drug.DrugName} />
                <h3>{drug.DrugName}</h3>
                {renderContraindications(drug.Indications)}
            </Link>
            ))}
        </div>
    );
};

export default DrugLinks;
