export class Index {
    configureRouter(config, router) {
      config.map([
        {
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List: Master Operator"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Master Operator"
        },
        {
          route: "view/:Id",
          moduleId: "./view",
          name: "view",
          nav: false,
          title: "View: Master Operator"
        },
        {
          route: "edit/:Id",
          moduleId: "./edit",
          name: "edit",
          nav: false,
          title: "Edit: Master Operator"
        }
      ]);
  
      this.router = router;
    }
  }
  