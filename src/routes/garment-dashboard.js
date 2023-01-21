module.exports = [
    {
        route: "/garment-dashboard/log-etl",
        name: "G-Dashboard Log ETL",
        moduleId: "./modules/garment-dashboard/log-etl/index",
        nav: true,
        title: "Log ETL Garment",
        auth: true,
        settings: {
          group: "g-dashboard",
          permission: { C9: 1, B1: 1, B12: 1 },
          iconClass: "fa fa-dashboard",
        },
    },
]