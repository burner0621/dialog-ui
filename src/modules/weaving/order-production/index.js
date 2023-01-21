export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Surat Perintah Produksi"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Surat Perintah Produksi"
      },
      {
        route: "view/:Id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Surat Perintah Produksi"
      },
      {
        route: "edit/:Id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: Surat Perintah Produksi"
      }
    ]);

    this.router = router;
  }
}
