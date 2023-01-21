export class Index {
    configureRouter(config, router) {
      config.map([{
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List Stop Opname Gudang Barang Jadi - Dyeing & Printing"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Stop Opname Gudang Barang Jadi - Dyeing & Printing"
        },
        {
          route: "view-scan",
          moduleId: "./view-scan",
          name: "view-scan",
          nav: false,
          title: "View-Scan: Stop Opname Gudang Barang Jadi - Dyeing & Printing"
        },
        {
          route: 'view/:id',
          moduleId: './view',
          name: 'view',
          nav: false,
          title: 'View: Stop Opname Gudang Barang Jadi - Dyeing & Printing'
        },
        {
          route: 'edit/:id',
          moduleId: './edit',
          name: 'edit',
          nav: false,
          title: 'Edit: Stop Opname Gudang Barang Jadi - Dyeing & Printing'
        }
        
      ]);
  
      this.router = router;
    }
  }
  