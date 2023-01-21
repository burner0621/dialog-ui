export class Index {
  configureRouter(config, router) {
    config.map([{
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Operasional Mesin Harian Sizing"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Operasional Mesin Harian Sizing"
      },
      {
        route: "update/:Id",
        moduleId: "./update",
        name: "update",
        nav: false,
        title: "Update: Operasional Mesin Harian Sizing"
      }
    ]);

    this.router = router;
  }
}
