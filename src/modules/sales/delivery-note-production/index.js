export class Index {
    configureRouter(config, router) {
        config.map([
            {
                route: ["", "list"],
                moduleId: "./list",
                name: "list",
                nav: true,
                title: "List: Surat Order Produksi",
            },
            {
                route: "view/:id",
                moduleId: "./view",
                name: "view",
                nav: false,
                title: "View: Surat Order Produksi",
            },
            {
                route: "edit/:id",
                moduleId: "./edit",
                name: "edit",
                nav: false,
                title: "Edit: Surat Order Produksi",
            },
            {
                route: "create",
                moduleId: "./create",
                name: "create",
                nav: true,
                title: "Create: Surat Order Produksi",
            },
        ]);
        this.router = router;
    }
}
