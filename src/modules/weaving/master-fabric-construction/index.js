export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Master Kebutuhan Benang"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Master Kebutuhan Benang"
      },
      {
        route: "view/:Id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Master Kebutuhan Benang"
      },
      {
        route: "edit/:Id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: Master Kebutuhan Benang"
      }
    ]);

    this.router = router;
  }
}
