export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'post'], moduleId: './post', name: 'post', nav: false, title: 'Pengisian Debit Jurnal VB' }
        ]);

        this.router = router;
    }
}
