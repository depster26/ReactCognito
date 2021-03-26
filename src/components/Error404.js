import React from "react";
import { Link } from "react-router-dom";

const Error404 = ({ message }) => {
	return (
		<div>
			<h1>Not Found</h1>
			<p>{message}</p>
			<p>
				<Link to="/">Return to Dashboard</Link>
			</p>
		</div>
	);
};

export default Error404;
