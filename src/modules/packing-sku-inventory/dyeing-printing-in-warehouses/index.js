export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Gudang Barang Jadi - Dyeing & Printing",
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Gudang Barang Jadi - Dyeing & Printing",
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View:  Gudang Barang Jadi - Dyeing & Printing",
      },
      {
        route: "view-bon/:id",
        moduleId: "./view-bon",
        name: "view-bon",
        nav: false,
        title: "View-Bon:  Gudang Barang Jadi - Dyeing & Printing",
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit:  Gudang Barang Jadi - Dyeing & Printing",
      },
      { route: 'excel', moduleId: './excel', name: 'excel', nav: false, title: 'Excel: Download Penerimaan Gudang Barang Jadi - Dyeing/Printing' }
      // { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Gudang Barang Jadi - Dyeing & Printing' },
    ]);

    this.router = router;
  }
}
