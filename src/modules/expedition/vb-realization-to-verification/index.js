export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Penyerahan Realisasi ke Verifikasi' },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Penyerahan Realisasi ke Verifikasi' }
    ]);

    this.router = router;
  }
}
