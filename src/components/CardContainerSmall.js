import React from "react";

const CardContainerSmall = ({ children }) => {
	return (
		<div className="col-sm-10 col-md-8 mx-auto">
			<div className="card">
				<div className="card-body">{children}</div>
			</div>
		</div>
	);
};

export default CardContainerSmall;
