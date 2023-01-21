export class Index {
    configureRouter(config, router) {
      config.map([{
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List Bon Keluar Gudang Greige - Weaving"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Bon Keluar Gudang Greige - Weaving"
        },
        {
          route: 'view/:id',
          moduleId: './view',
          name: 'view',
          nav: false,
          title: 'View: Bon Keluar Gudang Greige - Weaving'
        },
        {
          route: 'edit/:id',
          moduleId: './edit',
          name: 'edit',
          nav: false,
          title: 'Edit: Bon Keluar Gudang Greige - Weaving'
        },
        { route: 'excel', moduleId: './excel', name: 'excel', nav: false, title: 'CSV : Download Pencatatan Keluar CSV Gudang Greige - Weaving' },
        { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'CSV : Unggah CSV Pencatatan Keluar Gudang Greige - Weaving'}
      ]);
  
      this.router = router;
    }
  }
  