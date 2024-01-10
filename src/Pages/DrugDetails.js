import React, { Component } from "react";
import styles from "./DrugDetails.module.less";
import { Link } from "react-router-dom";
import icon_menu from "../Img/DrugDetails/icon_menu.svg";

class DrugDetails extends Component {
  render() {
    const { location } = this.props;
    const drug = location.state ? location.state.drug : null;

    if (!drug) {
      return <div>No drug details found.</div>;
    }

    return (
      <div className={styles.App}>
        <div className={styles.title}>
          {/* Link back to home page */}
          <Link to="/"> 
            <img className={styles.menu} src={icon_menu} width="22.8px" height="9.5px" alt="return" />
          </Link>
          <h1>Detail</h1>
        </div>
        
        <div key={drug.startTime} className={styles.card}>
          <img 
            className={styles.apill}
            width="888px"
            height="276px"
            src={drug.Image} 
            alt={drug.DrugName} 
          />
          <div className={styles.content}>
            <div className={styles.line}>
              <h2>{drug.DrugName}</h2>
            </div>
            <h2 className={styles.nn}>{drug.Dosage}</h2>
            <div className={styles.tags}>
              {drug.Indications.split(',').map((indication, index) => (
                <div key={index} className={styles.tag}>
                  {indication}
                </div>
              ))}
            </div>
            <p className={styles.detail}>Manufacturer: {drug.Manufacturer}</p>
            <p className={styles.detail}>Packaging: {drug.Packaging}</p>
            <p className={styles.detail}>Active Ingredient: {drug.ActiveIngredient}</p>
            <p className={styles.detail}>Contraindications: {drug.Contraindications}</p>
            <p className={styles.detail}>NDC: {drug.NDC}</p>
          </div>
          <Link 
            to={{
              pathname: `/clock`,
              state: { drug },
              }}
          >
            <button>Add to schedule</button>
          </Link>
        </div>
    </div>

    );
  }
}

export default DrugDetails;
