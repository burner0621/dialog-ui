export class Index {
  configureRouter(config, router) {
    config.map([{
      route: ["", "list"],
      moduleId: "./list",
      name: "list",
      nav: false,
      title: "List Bon Keluar Aval - Dyeing & Printing"
    },
    {
      route: "create",
      moduleId: "./create",
      name: "create",
      nav: false,
      title: "Create: Bon Keluar Aval - Dyeing & Printing"
    },
    {
      route: 'view/:id',
      moduleId: './view',
      name: 'view',
      nav: false,
      title: 'View: Bon Keluar Aval - Dyeing & Printing'
    },
    {
      route: 'edit/:id',
      moduleId: './edit',
      name: 'edit',
      nav: false,
      title: 'Edit: Bon Keluar Aval Aval - Dyeing & Printing'
    },
    { route: 'excel', moduleId: './excel', name: 'excel', nav: false, title: 'Excel: Download Pencatatan Keluar Gudang Aval - Dyeing/Printing' }
    ]);

    this.router = router;
  }
}
