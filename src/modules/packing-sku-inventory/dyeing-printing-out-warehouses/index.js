export class Index {
    configureRouter(config, router) {
      config.map([{
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List Bon Keluar Gudang Barang Jadi - Dyeing & Printing"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Bon Keluar Gudang Barang Jadi - Dyeing & Printing"
        },
        {
          route: 'view/:id',
          moduleId: './view',
          name: 'view',
          nav: false,
          title: 'View: Bon Keluar Gudang Barang Jadi - Dyeing & Printing'
        },
        // {
        //   route: 'edit/:id',
        //   moduleId: './edit',
        //   name: 'edit',
        //   nav: false,
        //   title: 'Edit: Penerimaan Aval - Dyeing & Printing'
        // }
      ]);
  
      this.router = router;
    }
  }
  