export default {
    data() {
        /**
         * @param {navgroup} 动态导航菜单默认值
          */
        return {
            navgroup: [
                {
                    name: "基础管理",
                    index: "1",
                    icon: "el-icon-setting",
                    sonMenu: [
                        {
                            name: "企业用户管理",
                            router: { path: "/home/userList" }
                        },
                        {
                            name: "测试码管理",
                            router: { path: "/home/testCode" }
                        },
                        {
                            name: "月卡管理",
                            router: { path: "/home/monthList" }
                        },
                        {
                            name: '季卡管理',
                            router: { path: "/home/seasonList" }
                        },
                        {
                            name: "APP配置管理",
                            router: { path: "/home/config" }
                        },
                        {
                            name: "网页配置",
                            router: { path: "/home/webConfig" }
                        },
                        {
                            name: "软件版本管理",
                            router: { path: "/home/version" }
                        },
                        {
                            name: '数据库管理',
                            router: { path: '/home/dataBase' }
                        },

                    ]
                },
                {
                    name: "代理管理",
                    index: "1",
                    icon: "el-icon-setting",
                    sonMenu: [
                        {
                            name: "代理用户列表",
                            router: { path: "/home/proxyList" }
                        },
                    ]
                }
            ],
            navgroup2: [
                {
                    name: "基础管理",
                    index: "1",
                    icon: "el-icon-setting",
                    sonMenu: [
                        {
                            name: "代理必看",
                            router: { path: "/home/proxyInfo" }
                        },
                        {
                            name: "企业用户管理",
                            router: { path: "/home/userListProxy" }
                        },
                        // {
                        //     name: "测试码管理",
                        //     router: { path: "/home/testCode" }
                        // },
                        // {
                        //     name: "月卡管理",
                        //     router: { path: "/home/monthList" }
                        // },
                        // {
                        //     name: '季卡管理',
                        //     router: { path: "/home/seasonList" }
                        // },
                    ]
                },
            ]


        }
    }
}