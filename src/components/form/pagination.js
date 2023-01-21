import React from 'react';
import ReactDOM from 'react-dom';
import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import { Pagination as ReactPagination } from 'react-bootstrap';

@noView()
@inject(Element)
@customElement('pagination')
export class Pagination {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) info;
    reactComponent = {};

    constructor(element) {
        this.element = element;
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(eventKey) {
        var page = eventKey;

        var event;

        if (document.createEvent) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent("change", true, true, page);
        } else {
            event = document.createEventObject();
            event.eventType = "change";
        }

        event.eventName = "change";

        if (document.createEvent) {
            this.element.dispatchEvent(event);
        } else {
            this.element.fireEvent("on" + event.eventType, event);
        };

        this.bind();
    }

    render() {
        // this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' };
        var totalPage = Math.ceil(this.info.total / this.info.size);
        this.reactComponent = ReactDOM.render(
            <ReactPagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={totalPage}
                maxButtons={5}
                activePage={this.info.page}
                onSelect={this.handlePageChange} />,
            this.element
        );
    }

    bind() {
        this.render();
    }

    unbind() {
        ReactDOM.unmountComponentAtNode(this.element);
    }

    /**
     * Data Changed
     * 
     * An automatic callback function when our "data"
     * bindable value changes. We need to rebind the React
     * element to get the new data from the ViewModel.
     * 
     * @param {any} newVal The updated data
     * @returns {void}
     * 
     */
    infoChanged(newVal) {  
        this.bind();
    }

}
