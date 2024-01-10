import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Example extends Component {
  render() {
    return (
      <div>
        <h1>This is an example page</h1>
        <p>The reasons for jumping to this page may include: 
            creating a certain page has no practical significance, or the project does not use a database.</p>
      </div>
    );
  }
}

export default withRouter(Example);
