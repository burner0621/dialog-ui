// we want font-awesome to load as soon as possible to show the fa-spinner
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/styles.css';
import '../styles/styles.components.css';
import '../styles/styles.login.css';
import '../styles/styles.theme.css';
import '../styles/dashboard.css';
import 'bootstrap';
import authConfig from "../auth-config";

// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature('au-components')
        .feature('components')
        .feature('converters')

        .plugin("aurelia-api", config => {
            var offset = new Date().getTimezoneOffset() / 60 * -1;
            var defaultConfig = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-timezone-offset': offset
                }
            }


            var core = "https://com-dl-service-core.azurewebsites.net/v1/";
            var auth = "https://com-danliris-service-auth.azurewebsites.net/v1/";
            var production = "https://dl-production-webapi.azurewebsites.net/v1/";
            var productionAzure = "https://com-danliris-service-finishing-printing.azurewebsites.net/v1/";
            var purchasing = "https://dl-purchasing-webapi.azurewebsites-dev.net/v1/";
            var purchasingAzure = "https://com-danliris-service-purchasing.azurewebsites.net/v1/";
            var garmentPurchasing = "https://dl-purchasing-garment-webapi.azurewebsites.net/v1/";
            var inventory = "https://dl-inventory-webapi.azurewebsites.net/v1/";
            var inventoryAzure = "https://com-danliris-service-inventory-prd.azurewebsites.net/v1/";
            var garmentMasterPlan = "https://dl-garment-master-plan-webapi.azurewebsites.net/v1/";
            var spMasterPlan = "https://dl-sp-master-plan-webapi.mybluemix.net/v1/";
            var spinning = "https://com-danliris-service-spinning.azurewebsites.net/";
            var intPurchasing = "https://com-danliris-service-internal-transfer.azurewebsites.net/v1/";
            var customsReport = "https://com-danliris-service-support.azurewebsites.net/v1/";
            var merchandiser = "https://com-danliris-service-md.azurewebsites.net/v1/";
            const dealTracking = 'https://com-danliris-service-deal-tracking.azurewebsites.net/v1/';
            const sales = "https://com-danliris-service-sales.azurewebsites.net/v1/";
            var weaving = "https://com-danliris-service-weaving.azurewebsites.net/";
            var finance = "https://com-danliris-service-finance-accounting.azurewebsites.net/v1/";
            var garmentProduction = "https://com-danliris-service-garment.azurewebsites.net/";
            var packingInventory = "https://com-danliris-service-packing-inventory.azurewebsites.net/v1/";
            var dyeing = "https://dyeing-printing-etl-service.azurewebsites.net/api/";
            const garmentShipping = "https://garment-etl-service.azurewebsites.net/api/";


            config.registerEndpoint('auth', auth);
            config.registerEndpoint('core', core);
            config.registerEndpoint('production', production, defaultConfig);
            config.registerEndpoint('production-azure', productionAzure, defaultConfig);
            config.registerEndpoint('purchasing', purchasing, defaultConfig);
            config.registerEndpoint('purchasing-azure', purchasingAzure, defaultConfig);
            config.registerEndpoint('garment-purchasing', garmentPurchasing, defaultConfig);
            config.registerEndpoint('inventory', inventory, defaultConfig);
            config.registerEndpoint('inventory-azure', inventoryAzure, defaultConfig);
            config.registerEndpoint('garment-master-plan', garmentMasterPlan, defaultConfig);
            config.registerEndpoint('spinning', spinning, defaultConfig);
            config.registerEndpoint('int-purchasing', intPurchasing, defaultConfig);
            config.registerEndpoint('customs-report', customsReport, defaultConfig);
            config.registerEndpoint('merchandiser', merchandiser, defaultConfig);
            config.registerEndpoint('deal-tracking', dealTracking, defaultConfig);
            config.registerEndpoint('sales', sales, defaultConfig);
            config.registerEndpoint('weaving', weaving, defaultConfig);
            config.registerEndpoint('finance', finance, defaultConfig);
            config.registerEndpoint('garment-production', garmentProduction, defaultConfig);
            config.registerEndpoint('packing-inventory', packingInventory, defaultConfig);
            config.registerEndpoint('dyeing', dyeing, { headers: { Accept: '*/*', 'Sec-Fetch-Site': 'cross-site' }, mode: 'cors' });
            config.registerEndpoint('garment-shipping', garmentShipping, defaultConfig);
        })
        .plugin("aurelia-authentication", baseConfig => {
            baseConfig.configure(authConfig);

            if (baseConfig.client && baseConfig.client.client) {
                var offset = new Date().getTimezoneOffset() / 60 * -1;
                baseConfig.client.client.withDefaults({
                    headers: {
                        'x-timezone-offset': offset
                    }
                })
            }
        })
        .plugin('aurelia-dialog', config => {
            config.useDefaults();
            config.settings.lock = true;
            config.settings.centerHorizontalOnly = false;
            config.settings.startingZIndex = 5;
        })
        .plugin('aurelia-dragula')
        .plugin('aurelia-bootstrap')
        .plugin('aurelia-google-analytics', (config) => {
            config.init('UA-138671841-2');
            config.attach({
                logging: {
                    // Set to `true` to have some log messages appear in the browser console.
                    enabled: true
                },
                pageTracking: {
                    // Set to `false` to disable in non-production environments.
                    enabled: true,
                    // Configure fragments/routes/route names to ignore page tracking for
                    ignore: {
                        fragments: [], // Ignore a route fragment, login fragment for example: ['/login']
                        routes: [], // Ignore a route, login route for example: ['login']
                        routeNames: [] // Ignore a route name, login route name for example: ['login-route']
                    },
                    // Optional. By default it gets the title from payload.instruction.config.title.
                    getTitle: (payload) => {
                        // For example, if you want to retrieve the tile from the document instead override with the following.
                        return document.title;
                    },
                    // Optional. By default it gets the URL fragment from payload.instruction.fragment.
                    getUrl: (payload) => {
                        // For example, if you want to get full URL each time override with the following.
                        return window.location.href;
                    }
                },
                clickTracking: {
                    // Set to `false` to disable in non-production environments.
                    enabled: true,
                    // Optional. By default it tracks clicks on anchors and buttons.
                    filter: (element) => {
                        // For example, if you want to also track clicks on span elements override with the following.
                        return element instanceof HTMLElement &&
                            (element.nodeName.toLowerCase() === 'a' ||
                                element.nodeName.toLowerCase() === 'button' ||
                                element.nodeName.toLowerCase() === 'span');
                    }
                },
                exceptionTracking: {
                    // Set to `false` to disable in non-production environments.
                    enabled: true
                }
            });
        })
        .developmentLogging();

    // Uncomment the line below to enable animation.
    // aurelia.use.plugin('aurelia-animator-css');
    // if the css animator is enabled, add swap-order="after" to all router-view elements

    // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    // aurelia.use.plugin('aurelia-html-import-template-loader')

    await aurelia.start();
    aurelia.setRoot('app');

    // if you would like your website to work offline (Service Worker), 
    // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
    /*
    const offline = await System.import('offline-plugin/runtime');
    offline.install();
    */
}
