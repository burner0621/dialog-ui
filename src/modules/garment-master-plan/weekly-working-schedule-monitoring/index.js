export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Monitoring Jadwal Pengerjaan Per Week' },
        ]);

        this.router = router;
    }
}
