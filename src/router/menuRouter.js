const menuRouter = {
    path: '/home',
    component: () => import('../components/views/home.vue'),
    redirect: { path: '/home/welcome' },
    children: [
        {
            path: 'setting',
            component: () => import('../components/views/setting.vue')
        },
        {
            path: 'welcome',
            component: () => import('../components/views/welcome.vue'),
        },
        {
            path: 'userList',
            component: () => import('../components/views/userList.vue')
        },
        {
            path: "testCode",
            component: () => import('../components/views/testCode.vue')
        },
        {
            path: 'monthList',
            component: () => import('../components/views/monthList.vue')
        },
        {
            path: "seasonList",
            component: () => import('../components/views/seasonList.vue')
        },
        {
            path: 'version',
            component: () => import('../components/views/appVersion.vue')
        },
        {
            path: "deviceList",
            component: () => import('../components/views/deviceList.vue')
        },
        {
            path: "webConfig",
            component: () => import("../components//views/webConfig.vue")
        },
        {
            path: "config",
            component: () => import('../components/views/config.vue')
        },
        {
            path: "dataBase",
            component: () => import('../components/views/dataBase.vue')
        },
        {
            path: "proxyList",
            component: () => import('../components/views/proxyList.vue')
        },
        {
            path: "proxyDetail",
            component: () => import('../components/views/proxyDetail.vue')
        },
        {
            path: "userListProxy",
            component: () => import("../components/views/proxyFile/userListProxy.vue")
        },
        {
            path: "proxyInfo",
            component: () => import("../components/views/proxyFile/proxyInfo.vue")
        },
        {
            path: 'packageManage',
            component: () => import("../components/views/packageManage.vue")
        },
        {
            path: 'subData',
            component: () => import("../components/views/subData.vue")
        }

    ]

}


export default menuRouter

