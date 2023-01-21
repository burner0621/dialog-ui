export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Validasi Surat Perintah Produksi - Kabag Md' },

            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Validasi Surat Perintah Produksi - Kabag Md' }

        ]);

        this.router = router;
    }
}