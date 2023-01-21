export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Realisasi VB Non PO",
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Realisasi VB Non PO",
      },
      {
        route: "create-inklaring",
        moduleId: "./create-inklaring",
        name: "create-inklaring",
        nav: false,
        title: "Create: Realisasi VB Inklaring Non PO",
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View:  Realisasi VB Non PO",
      },
      {
        route: "view-inklaring/:id",
        moduleId: "./view-inklaring",
        name: "view-inklaring",
        nav: false,
        title: "View:  Realisasi VB Inklaring Non PO",
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: Realisasi VB Non PO",
      },
      {
        route: "edit-inklaring/:id",
        moduleId: "./edit-inklaring",
        name: "edit-inklaring",
        nav: false,
        title: "Edit: Realisasi VB Inklaring Non PO",
      },
    ]);

    this.router = router;
  }
}
