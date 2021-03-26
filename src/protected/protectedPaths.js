class ProtectedPaths {
	static DASHBOARD = "/dashboard";
	static EXPERIMENTS = "/experiments";
	static CREATE_EXPERIMENT = "/experiments/create";
	static VIEW_EXPERIMENT = "/experiments/:experimentId";
	static DELETE_EXPERIMENT = "/experiments/:experimentId/delete";
	static UPDATE_EXPERIMENT = "/experiments/:experimentId/update";

	static CREATE_VARIANT = "/experiments/:experimentId/variant/create";
	static DELETE_VARIANT =
		"/experiments/:experimentId/variant/:variantId/delete";
	static UPDATE_VARIANT =
		"/experiments/:experimentId/variant/:variantId/update";
}

export default ProtectedPaths;
