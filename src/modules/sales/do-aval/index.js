export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "List: DO Aval",
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: DO Aval",
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: DO Aval",
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: true,
        title: "Create: DO Aval",
      },
    ]);
    this.router = router;
  }
}
