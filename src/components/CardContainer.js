import React from "react";

const CardContainer = ({ children }) => {
	return (
		<div className="card">
			<div className="card-body">{children}</div>
		</div>
	);
};

export default CardContainer;
