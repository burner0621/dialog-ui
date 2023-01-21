export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "List",
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View:BudgetCategory",
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit:BudgetCategory",
      },
      {
        route: "upload",
        moduleId: "./upload",
        name: "upload",
        nav: false,
        title: "Upload:BudgetCategory",
      },
    ]);

    this.router = router;
  }
}
