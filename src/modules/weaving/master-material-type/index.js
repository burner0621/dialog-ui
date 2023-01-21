export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "List: Master Tipe Material"
      },
      {
        route: "view/:Id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Master Tipe Material"
      },
      {
        route: "edit/:Id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: Master Tipe Material"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Master Tipe Material"
      }
    ]);
  }
}
