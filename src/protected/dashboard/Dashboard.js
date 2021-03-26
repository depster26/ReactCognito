import React from "react";

import PageTitle from "../../components/PageTitle";
import CardContainer from "../../components/CardContainer";

const Dashboard = () => {
  return (
    <CardContainer>
      <PageTitle title="Dashboard" />
      <p>Access to protected content has been granted!</p>
    </CardContainer>
  );
};

export default Dashboard;
