import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-purchase-requests';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info, byUser) {
        var endpoint = `${serviceUri}${byUser ? '/by-user' : ''}`;
        return super.list(endpoint, info);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    read(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        console.log(data);
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    post(data) {
        var endpoint = `${serviceUri}/post`;
        return super.post(endpoint, data);
    }

    unpost(data) {
        var endpoint = `${serviceUri}/unpost/${data.Id}`;
        return super.put(endpoint, data);
    }

    getPdf(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }
}

const serviceMasterGarmentProductUri = 'master/garmentProducts';
const serviceMasterUomUri = 'master/uoms';
const serviceMasterGarmentSectionUri = 'master/garment-sections';

class CoreService extends RestService {
    constructor(http, aggregator, config) {
        super(http, aggregator, config, "core");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getProductByName(name) {
        var endpoint = `${serviceMasterGarmentProductUri}/byName?name=${name}`;
        return super.get(endpoint);
    }

    getUomByUnit(unit) {
        var endpoint = `${serviceMasterUomUri}?keyword=${unit}`;
        return super.get(endpoint)
            .then((result) => {
                if (result && result.length > 0) {
                    return result[0];
                } else {
                    return null;
                }
            })
    }

    getGarmentProductsDistinctDescription(keyword, filter) {
        const resource = `${serviceMasterGarmentProductUri}/distinct-product-description`;
        return super.list(resource, { keyword: keyword, filter: filter })
            .then((result) => result.data);
    }

    getGarmentProductConsts(keyword, filter) {
        const resource = `${serviceMasterGarmentProductUri}/distinct-product-const`;
        return super.list(resource, { keyword: keyword, filter: filter })
            .then((result) => result.data);
    }

    getGarmentProductYarns(keyword, filter) {
        const resource = `${serviceMasterGarmentProductUri}/distinct-product-yarn`;
        return super.list(resource, { keyword: keyword, filter: filter })
            .then((result) => result.data);
    }

    getGarmentProductWidths(keyword, filter) {
        const resource = `${serviceMasterGarmentProductUri}/distinct-product-width`;
        return super.list(resource, { keyword: keyword, filter: filter })
            .then((result) => result.data);
    }

    getGarmentProductsByIds(info) {
        var endpoint = `${serviceMasterGarmentProductUri}/byId`;
        return super.list(endpoint, { garmentProductList: info })
            .then((result) => result.data);
    }

    getGarmentSection(id) {
        var endpoint = `${serviceMasterGarmentSectionUri}/${id}`;
        return super.get(endpoint);
    }
}

export { Service, CoreService }