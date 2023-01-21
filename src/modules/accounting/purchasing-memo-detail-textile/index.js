export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Rincian Memo Pembelian Textile Disposisi",
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Rincian Memo Pembelian Textile Disposisi",
      },
      {
        route: "create-inklaring",
        moduleId: "./create-inklaring",
        name: "create-inklaring",
        nav: false,
        title: "Create: Rincian Memo Pembelian Textile Non Disposisi",
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Rincian Memo Pembelian Textile Disposisi",
      },
      {
        route: "view-inklaring/:id",
        moduleId: "./view-inklaring",
        name: "view-inklaring",
        nav: false,
        title: "View:  Rincian Memo Pembelian Textile Non Disposisi",
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: Rincian Memo Pembelian Textile Disposisi",
      },
      {
        route: "edit-inklaring/:id",
        moduleId: "./edit-inklaring",
        name: "edit-inklaring",
        nav: false,
        title: "Edit: Rincian Memo Pembelian Textile Non Disposisi",
      },
    ]);

    this.router = router;
  }
}
