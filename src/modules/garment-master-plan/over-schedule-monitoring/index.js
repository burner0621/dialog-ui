export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List Monitoring Keterlambatan Jadwal Pengerjaan' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Monitoring Keterlambatan Jadwal Pengerjaan' },
        ]);

        this.router = router;
    }
}