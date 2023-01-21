export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List Shift"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Shift"
      },
      { 
        route: 'edit/:Id', 
        moduleId: './edit', 
        name: 'edit', 
        nav: false, 
        title: 'Edit: Shift' 
      }
    ]);

    this.router = router;
  }
}
