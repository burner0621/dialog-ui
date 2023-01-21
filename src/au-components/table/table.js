import { inject, DOM, bindable, customElement, computedFrom, bindingMode, containerless, transient, useShadowDOM } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import "bootstrap-table";
import "./context-menu.js";
import "bootstrap-table/dist/locale/bootstrap-table-id-ID.js";
import "bootstrap-table/dist/extensions/group-by-v2/bootstrap-table-group-by";
import "bootstrap-table/dist/extensions/sticky-header/bootstrap-table-sticky-header";

import "bootstrap-table/dist/bootstrap-table.css";
import "bootstrap-table/dist/extensions/sticky-header/bootstrap-table-sticky-header.css";
import "./table.css";

@customElement("au-table")
@inject(Element, BindingSignaler)
// @useShadowDOM()
export class Table {
  // bindables
  @bindable data; // array or function returning array;
  @bindable selectable; // boolean: enable multiple select.
  @bindable({ defaultBindingMode: bindingMode.twoWay }) selections; // array: selected data;
  @bindable context; // array of string / object {key, text}: single context menu
  @bindable groupBy; // string: field name to be used on group by;
  @bindable contextShow;
  @bindable columns;
  @bindable pageSize;
  @bindable pageList;
  @bindable locale;
  @bindable sortable;
  @bindable rowFormatter;
  @bindable options;

  // internal variables 
  __contextRowData = null;

  constructor(element, signaler) {
    this.element = element;
    this.signaler = signaler;
  }
  @computedFrom("context")
  get __context() {
    if (this.context && this.context.constructor === Array) {
      return this.context;
    }
    else
      return null;
  }

  @computedFrom("__context")
  get __hasContext() {
    var result = this.__context && this.__context.reduce((prev, curr, index) => {
      return prev || this.__contextShow(index, curr)
    }, false)
    return result;
  }

  __contextShow(contextIndex, contextName) {
    if (this.__contextRowData) {
      var arg = { index: contextIndex, context: contextName, data: this.__contextRowData };
      return this.contextShow(arg);
    }
    else
      return true;
  }


  attached() {
    this.contextShow = this.contextShow ? this.contextShow : () => true;
    this.__init();
  }

  bind() {
    this.data = this.data ? this.data : [];
  }

  __loadData(params) {
    if (this.data && this.data.constructor === Array) {
      Promise.resolve(this.data)
        .then(data => {
          params.success(data)
        });
    }
    else if (typeof this.data === "function") {
      Promise.resolve(this.data(params.data))
        .then(result => {
          params.success({
            total: result.total,
            rows: result.data
          })
        });
    }
  }

  @computedFrom("columns")
  get __columns() {
    if (this.columns && this.columns.constructor === Array) {
      return this.columns.map(el => {
        var col;
        if (typeof el === "string") {
          col = {
            field: el,
            title: el
          };
        }
        else if (typeof el === "object")
          col = el;

        col.sortable = col.sortable === false ? false : this.sortable ? true : false;
        return col;
      })
    }
    else
      return [];
  }

  get __defaultOptions() {
    var userOptions = this.options || {};

    if (this.pageSize)
      userOptions.pageSize = this.pageSize;

    if (this.pageList && this.pageList.constructor === Array)
      userOptions.pageList = this.pageList;

    if (this.locale)
      userOptions.locale = this.locale;

    // contextmenu
    if (this.__hasContext) {
      userOptions.contextMenu = '#context-menu';
      userOptions.contextMenuAutoClickRow = this.__hasContext;
      userOptions.clickToSelect = this.__hasContext;
    }

    // row style
    if (this.rowFormatter) {
      userOptions.rowStyle = this.rowFormatter;
    }

    // group by
    if (this.groupBy) {
      userOptions.groupBy = this.groupBy !== null;
      userOptions.groupByField = this.groupBy;
    }

    var options = {
      pagination: true,
      sidePagination: typeof this.data === "function" ? "server" : "client",
      // showPaginationSwitch: true,
      showColumns: true,
      search: true,
      searchText: '',
      showToggle: true,
      columns: this.__columns,
      ajax: (params) => {
        this.__loadData(params)
      },

      // toolbar
      toolbar: this.toolbar
    };

    return Object.assign(options, userOptions);
  }

  __init() {
    if (!this.__initialized) {
      this.__instance = this.__table(this.__defaultOptions);

      // row-click event
      $(this.table).on("click-row.bs.table", (event, row, element, field) => {
        var eventDetail = row;
        this.__contextRowData = eventDetail;
        this.signaler.signal('context:row-changed');

        $(this.table).find('.active').removeClass('active');
        element.addClass('active');
        this.element.dispatchEvent(DOM.createCustomEvent("row-click", { detail: eventDetail, bubbles: true }))
      });

      // page-changed event
      $(this.table).on("page-change.bs.table", (event, pageNumber, pageSize) => {
        var eventDetail = {
          page: pageNumber,
          size: pageSize
        };
        this.element.dispatchEvent(DOM.createCustomEvent("page-change", { detail: eventDetail, bubbles: true }))
      });

      // search event
      $(this.table).on("search.bs.table", (event, searchText) => {
        var eventDetail = {
          keyword: searchText
        };

        this.element.dispatchEvent(DOM.createCustomEvent("search", { detail: eventDetail, bubbles: true }))
      });

      // context-menu event
      $(this.table).on("contextmenu-item.bs.table", (event, row, element) => {
        var eventDetail = {
          name: element.data("item"),
          data: row//this.__contextRowData
        };
        this.element.dispatchEvent(DOM.createCustomEvent("context-click", { detail: eventDetail, bubbles: true }))
      });

      // check event
      $(this.table)
        .on("check.bs.table", (event, row, element) => {
          this.selections = this.__table("getSelections");
        })
        .on("check-some.bs.table", (event, rows) => {
          this.selections = this.__table("getSelections");
        })
        .on("check-all.bs.table", (event, rows) => {
          this.selections = this.__table("getSelections");
        })
        .on("uncheck.bs.table", (event, row, element) => {
          this.selections = this.__table("getSelections");
        })
        .on("uncheck-some.bs.table", (event, rows) => {
          this.selections = this.__table("getSelections");
        })
        .on("uncheck-all.bs.table", (event, rows) => {
          this.selections = this.__table("getSelections");
        });

      this.__initialized = true;
    }
  }

  __highlighRows() {

  }

  refresh() {
    this.__table("refresh", { silent: true });
  }
  __table(arg1, arg2) {
    if (this.__instance)
      return this.__instance.bootstrapTable(arg1, arg2);
    else
      return $(this.table).bootstrapTable(arg1, arg2)
  }
}
