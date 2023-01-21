import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    dataToBePosting = [];
    info = { page: 1, keyword: '' };

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    async activate() {
        this.info.keyword = '';
        var result = await this.service.search(this.info);
        this.data = result.data;
        this.info = result.info;
    }

    loadPage() {
        var keyword = this.info.keyword;
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.info;
                this.info.keyword = keyword;
            })
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }


    tooglePostingTrue() {
        this.isPosting = true;
        this.isPrint = false;
    }

    tooglePostingFalse() {
        this.isPosting = false;
        this.isPrint = false;
    }

    pushDataToBePosting(item) {
        if (item.isPosting) {
            this.dataToBePosting.push(item);
        }
        else {
            var index = this.dataToBePosting.indexOf(item);
            this.dataToBePosting.splice(index, 1);
        }
    }

    posting() {
        if (this.dataToBePosting.length > 0) {
            this.service.post(this.dataToBePosting).then(result => {
                this.info.keyword = '';
                this.loadPage();
            }).catch(e => {
                this.error = e;
            })
        }
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    exportPDF(data) {
        this.service.getPdfById(data._id);
    }
}