import React, { Component } from "react";

class DrugDetails extends Component {
  render() {
    const { location } = this.props;
    const drug = location.state ? location.state.drug : null;

    if (!drug) {
      return <div>No drug details found.</div>;
    }

    return (
      <div>
        <h2>{drug.DrugName} Details</h2>
        <p>ID: {drug.ID}</p>
        <p>Manufacturer: {drug.Manufacturer}</p>
        <img src={drug.Image} alt={drug.DrugName} />
        {/* Display other drug details */}
      </div>
    );
  }
}

export default DrugDetails;
