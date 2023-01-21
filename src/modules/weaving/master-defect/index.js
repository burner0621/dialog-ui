export class Index {
  configureRouter(config, router) {
    config.map([{
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List Master Cacat Kain"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Master Cacat Kain"
      },
      {
        route: 'view/:Id',
        moduleId: './view',
        name: 'view',
        nav: false,
        title: 'View: Master Cacat Kain'
      },
      {
        route: 'edit/:Id',
        moduleId: './edit',
        name: 'edit',
        nav: false,
        title: 'Edit: Master Cacat Kain'
      }
    ]);

    this.router = router;
  }
}
