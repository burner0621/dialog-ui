import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-purchase-requests';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    read(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    approve(data) {
        var endpoint = `${serviceUri}/approve/${data.Id}`;
        return super.put(endpoint, data);
    }

    unapprove(data) {
        var endpoint = `${serviceUri}/unapprove/${data.Id}`;
        return super.put(endpoint, data);
    }

    patch(id, data) {
        var endpoint = `${serviceUri}/${id}`;
        return super.patch(endpoint, data);
    }
}

const serviceMasterGarmentProductUri = 'master/garmentProducts';
const serviceMasterUomUri = 'master/uoms';

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
}

export { Service, CoreService }