export class Index {
    configureRouter(config, router) {
      config.map([
        {
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List: Perencanaan Mesin"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Perencanaan Mesin"
        },
        {
          route: "view/:Id",
          moduleId: "./view",
          name: "view",
          nav: false,
          title: "View: Perencanaan Mesin"
        },
        {
          route: "edit/:Id",
          moduleId: "./edit",
          name: "edit",
          nav: false,
          title: "Edit: Perencanaan Mesin"
        }
      ]);
  
      this.router = router;
    }
  }
  