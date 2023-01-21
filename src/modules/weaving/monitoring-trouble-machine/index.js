export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "List: Monitoring Trouble Mesin"
      },
      {
        route: "view/:Id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Trouble Mesin"
      },
      {
        route: "edit/:Id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: Trouble Mesin"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Trouble Mesin"
      }
    ]);
  }
}
