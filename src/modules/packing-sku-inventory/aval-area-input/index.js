export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Penerimaan Aval - Dyeing & Printing",
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Penerimaan Aval - Dyeing & Printing",
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Penerimaan Aval - Dyeing & Printing",
      },
      { route: 'excel', moduleId: './excel', name: 'excel', nav: false, title: 'Excel: Download Penerimaan Gudang Aval - Dyeing/Printing' }
      // {
      //   route: 'edit/:id',
      //   moduleId: './edit',
      //   name: 'edit',
      //   nav: false,
      // title: 'Edit: Aval - Dyeing & Printing'
      // }
    ]);

    this.router = router;
  }
}
