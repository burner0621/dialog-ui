export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Surat Perintah Produksi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Surat Perintah Produksi' }
        ]);

        this.router = router;
    }
}