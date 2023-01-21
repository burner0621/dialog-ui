import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class LoadingModal {
    promises = [];
    show = false;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.subscribe();
    }

    subscribe() {
        this.eventAggregator.subscribe('httpRequest', promise => {
            var promiseIndex = this.promises.indexOf(promise);
            if (promiseIndex < 0) {
                this.promises.push(promise);
                this.show = true;
            }
            else {
                // if (promise.isFulfilled()) {
                    this.promises.splice(promiseIndex, 1);
                    this.show = false;
                // }
            }
        });
    }
}