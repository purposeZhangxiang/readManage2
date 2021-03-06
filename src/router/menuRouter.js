const menuRouter = {
    path: '/home',
    component: () => import('../components/views/home.vue'),
    redirect: { path: '/home/welcome' },
    children: [
        {
            path: 'welcome',
            component: () => import('../components/views/welcome.vue'),
        },
        {
            path: 'setting',
            component: () => import('../components/views/setting.vue')
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
            path: 'packageManage',
            component: () => import("../components/views/packageManage.vue")
        },
        {
            path: 'subData',
            component: () => import("../components/views/subData.vue")
        },
        {
            path: 'samePackage',
            component: () => import("../components/views/samePackage.vue")
        },
        //代理
        {
            path: "userListProxy",
            component: () => import("../components/views/proxyFile/userListProxy.vue")
        },
        {
            path: 'monthListProxy',
            component: () => import("../components/views/proxyFile/monthListProxy.vue")
        },
        {
            path: "proxyDeviceList",
            component: () => import("../components/views/proxyFile/proxyDeviceList.vue")
        },
        {
            path: "proxyInfo",
            component: () => import("../components/views/proxyFile/proxyInfo.vue")
        },
    ]

}


export default menuRouter

