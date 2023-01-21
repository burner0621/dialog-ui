export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Visualisasi Pemantauan Beam"
      }
    ]);

    this.router = router;
  }
}
