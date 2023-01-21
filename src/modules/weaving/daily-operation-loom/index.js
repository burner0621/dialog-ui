export class Index {
    configureRouter(config, router) {
      config.map([{
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List: Operasional Mesin Harian Loom"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Operasional Mesin Harian Loom"
        },
        {
          route: "update/:Id",
          moduleId: "./update",
          name: "update",
          nav: false,
          title: "Update: Operasional Mesin Harian Loom"
        }
      ]);
  
      this.router = router;
    }
  }
  