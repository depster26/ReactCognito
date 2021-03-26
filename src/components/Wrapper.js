import React from "react";

const Wrapper = ({ children }) => {
	return (
		<div className="container-lg">
			<main className="content">{children}</main>
		</div>
	);
};

export default Wrapper;
