module.exports = {
    childRoutes: [
        {
            path: "/membership",
            indexRoute: {
                onEnter: (nextState, replace) => replace("/membership/members"),
            },
            childRoutes: [
                {
                    path: "members",
                    indexRoute: {
                        component: require("./MemberList").default,
                    },
                    childRoutes: [
                        {
                            path: "add",
                            component: require("./MemberAdd").default,
                        },
                        {
                            path: ":member_id",
                            component:  require("./MemberBox").default,
                            indexRoute: {
                                component: require("./MemberBoxInfo").default,
                            },
                            childRoutes: [
                                {
                                    path: "info",
                                    component: require("./MemberBoxInfo").default,
                                },
                                {
                                    path: "groups",
                                    component: require("./MemberBoxGroups").default,
                                },
                                {
                                    path: "keys",
                                    component: require("./MemberBoxKeys").default,
                                },
                                {
                                    path: "permissions",
                                    component: require("./MemberBoxPermissions").default,
                                },
                                {
                                    path: "orders",
                                    component: require("./MemberBoxOrders").default,
                                },
                                {
                                    path: "messages",
                                    indexRoute: {
                                        component: require("./MemberBoxMessages").default,
                                    },
                                    childRoutes: [
                                        {
                                            path: "new",
                                            component: require("./MemberBoxNewMessage").default,
                                        },
                                    ],
                                },
                            ]
                        },
                    ],
                },
                {
                    path: "groups",
                    indexRoute: {
                        component: require("./GroupList").default,
                    },
                    childRoutes: [
                        {
                            path: "add",
                            component: require("./GroupAdd").default,
                        },
                        {
                            path: ":group_id",
                            component: require("./GroupBox").default,
                            indexRoute: {
                                component: require("./GroupBoxEditInfo").default,
                            },
                            childRoutes: [
                                {
                                    path: "info",
                                    component: require("./GroupBoxEditInfo").default,
                                },
								{
									path: "members",
									indexRoute: {
										component: require("./Components/GroupBox/Member/List"),
									},
									childRoutes: [
										{
											path: "add",
											component: require("./Components/GroupBox/Member/Add"),
										},
									],
								},
								{
									path: "permissions",
									indexRoute: {
										component: require("./Components/GroupBox/Permissions/List"),
									},
									childRoutes: [
										{
											path: "add",
											component: require("./Components/GroupBox/Permissions/Add"),
										},
									],
								},
							],
						},
					],
				},
				{
					path: "keys",
					indexRoute: {
						component: require("./Pages/Key/List")
					},
					childRoutes: [
						{
							path: "add",
							component: require("./Pages/Key/Add")
						},
						{
							path: ":id",
							component: require("./Pages/Key/Show")
						},
					]
				},
				{
					path: "spans",
					indexRoute: {
						component: require("./Pages/Span/List"),
					},
					childRoutes: [
						{
							path: ":span_id",
							component: require("./Pages/Span/Show"),
						},
					],
				},
			]
		},
	]
}