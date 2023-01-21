module.exports = [
    {
        route: 'power-bi/purchasing/textile',
        name: 'power-bi-purchasing-textile',
        moduleId: './modules/power-bi/purchasing-textile/index',
        nav: true,
        title: 'Power BI: Textile Purchasing Reports',
        auth: true,
        settings: {
            group: "reports",
            //permission : {"P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "C9": 1, "PG": 7},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'power-bi/purchasing/garment',
        name: 'power-bi-purchasing-garment',
        moduleId: './modules/power-bi/purchasing-garment/index',
        nav: true,
        title: 'Power BI: Garment Purchasing Reports',
        auth: true,
        settings: {
            group: "reports",
            //permission: { "P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "C9": 1, "PG": 7 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'power-bi/finishing-printing',
        name: 'power-bi-finishing-printing',
        moduleId: './modules/power-bi/finishing-printing/index',
        nav: true,
        title: 'Power BI: Finishing Printing Reports',
        auth: true,
        settings: {
            group: "reports",
            //permission: { "C9": 1, "F1": 7, "F2": 7 },
            iconClass: 'fa fa-dashboard'
        }
    }, {
        route: 'power-bi/sales',
        name: 'power-bi-sales',
        moduleId: './modules/power-bi/sales/index',
        nav: true,
        title: 'Power BI: Sales Reports',
        auth: true,
        settings: {
            group: "reports",
            //permission: { "A2": 7, "C9": 1, "F1": 7, "F2": 7 },
            iconClass: 'fa fa-dashboard'
        }
    }, {
        route: 'power-bi/inventory',
        name: 'power-bi-inventory',
        moduleId: './modules/power-bi/inventory/index',
        nav: true,
        title: 'Power BI: Inventory Reports',
        auth: true,
        settings: {
            group: "reports",
            //permission: { "A2": 7, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'power-bi/dealtracking',
        name: 'power-bi-dealtracking',
        moduleId: './modules/power-bi/dealtracking/index',
        nav: true,
        title: 'Power BI: Deal Tracking',
        auth: true,
        settings: {
            group: "reports",
            //permission: { "A2": 1, "C9": 1, "PGA":1, "PA":1, "PM":1, "PE":1 },
            iconClass: 'fa fa-dashboard'
        }
    }]
