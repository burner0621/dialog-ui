export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "List: Faktur Penjualan Ekspor",
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Faktur Penjualan Ekspor",
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: Faktur Penjualan Ekspor",
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: true,
        title: "Create: Faktur Penjualan Ekspor",
      },
    ]);
    this.router = router;
  }
}
