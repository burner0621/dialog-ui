export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Garment Purchasing Reports'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Garment Purchasing Reports'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Garment Purchasing Reports'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Garment Purchasing Reports'}
    ]);

    this.router = router;
  }
}