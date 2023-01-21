module.exports = [
    {
        route: '/int-purchasing/transfer-request',
        name: 'transfer-request',
        moduleId: './modules/int-purchasing/transfer-request/index',
        nav: true,
        title: 'Transfer Request',
        auth: true,
        settings: {
            group: "int-purchasing",
            //permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/int-purchasing/transfer-request-report',
        name: 'transfer-request-report',
        moduleId: './modules/int-purchasing/transfer-request-report/index',
        nav: true,
        title: 'Laporan Transfer Request',
        auth: true,
        settings: {
            group: "int-purchasing",
            //permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: ['int-purchasing/internal-transfer-order'],
        name: 'internal-transfer-order',
        moduleId: './modules/int-purchasing/internal-transfer-order/index',
        nav: true,
        title: 'Transfer Order Internal',
        auth: true,
        settings: {
            group: "int-purchasing",
            //permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: ['int-purchasing/internal-transfer-order-report'],
        name: 'internal-transfer-order',
        moduleId: './modules/int-purchasing/internal-transfer-order-report/index',
        nav: true,
        title: 'Laporan Transfer Order Internal',
        auth: true,
        settings: {
            group: "int-purchasing",
            //permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/int-purchasing/external-transfer-order',
        name: 'external-transfer-order',
        moduleId: './modules/int-purchasing/external-transfer-order/index',
        nav: true,
        title: 'Transfer Order Eksternal',
        auth: true,
        settings: {
            group: "int-purchasing",
            //permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {

        route: ['int-purchasing/transfer-delivery-order'],
        name: 'transfer-delivery-order',
        moduleId: './modules/int-purchasing/transfer-delivery-order/index',
        nav: true,
        title: 'DO',
        auth: true,
        settings: {
            group: "int-purchasing",
            //permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: ['int-purchasing/transfer-shipping-order'],
        name: 'transfer-shipping-order',
        moduleId: './modules/int-purchasing/transfer-shipping-order/index',
        nav: true,
        title: 'Surat Jalan',
        auth: true,
        settings: {
            group: "int-purchasing",
            //permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
]
