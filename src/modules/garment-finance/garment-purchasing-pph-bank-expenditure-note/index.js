export class Index {
    configureRouter(config, router) {
        config.map([
            {
                route: ["", "list"],
                moduleId: "./list",
                name: "list",
                nav: true,
                title: "List: Pengajuan Pembayaran PPH"
            },
            { 
                route: "create",
                moduleId: "./create",
                name: "create",
                nav: false,
                title: "Create: Pengajuan Pembayaran PPH" 
            },
            {
                route:"view",
                moduleId: "./view",
                name: "view",
                nav: false,
                title: "Rincian: Pengajuan Pembayaran PPH"
            },
            {
                route:"edit",
                moduleId: "./edit",
                name: "edit",
                nav: false,
                title: "Edit: Pengajuan Pembayaran PPH"
            }
        ]);

        this.router = router;
    }
}
