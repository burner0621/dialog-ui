export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'post'], moduleId: './post', name: 'post', nav: false, title: 'Posting Jurnal Transaksi' }
        ]);

        this.router = router;
    }
}
