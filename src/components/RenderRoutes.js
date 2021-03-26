import { Redirect, Route, Switch } from "react-router-dom";
import Error404 from "./Error404";

const RenderRoutes = ({ routes, defaultRedirectPath }) => {
	return (
		<Switch>
			{routes.map((route) => {
				const ComponentName = route.component;
				return (
					<Route
						path={route.path}
						exact={route.exact}
						key={route.key}
					>
						<ComponentName />
					</Route>
				);
			})}
			<Route path="/404">
				<Error404 />
			</Route>
			<Redirect to={defaultRedirectPath} />
		</Switch>
	);
};

export default RenderRoutes;
