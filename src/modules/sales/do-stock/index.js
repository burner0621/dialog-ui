export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "List: DO Stock",
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: DO Stock",
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: DO Stock",
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: true,
        title: "Create: DO Stock",
      },
    ]);
    this.router = router;
  }
}
