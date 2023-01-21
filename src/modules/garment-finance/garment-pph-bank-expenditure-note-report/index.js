export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "Laporan Pengajuan Pembayaran PPH",
      },
    ]);

    this.router = router;
  }
}
