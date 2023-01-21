import { RestService } from '../../../utils/rest-service';
import { buildQueryString } from 'aurelia-path';

const serviceUri = 'garment-stock-opnames';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    read(id) {
        let endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    download(info) {
        let endpoint = `${serviceUri}/download?${buildQueryString(info)}`;
        return super.getFile(endpoint);
    }

    upload(file) {
        let formData = new FormData();
        formData.append("fileUpload", file);

        let endpoint = `${serviceUri}/upload`;
        let request = {
            method: 'POST',
            headers: {},
            body: formData
        };

        let promise = this.endpoint.client.fetch(endpoint, request);
        super.publish(promise);
        return promise.then(response => {
            if (response.status == 201)
                return Promise.resolve(response);
            else {
                return response.json()
                    .then(result => {
                        this.publish(promise);
                        if (typeof result.error === 'string' || result.error instanceof String) {
                            return Promise.reject(new Error(result.error));
                        } else {
                            return Promise.reject(result.error);
                        }
                    });
            }
        })
    }

    createStock(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }
}

export { Service }