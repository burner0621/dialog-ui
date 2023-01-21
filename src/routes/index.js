var generalRoutes = require("./general");
var masterRoutes = require("./master");
var productionRoutes = require("./production");
var inventoryRoutes = require("./inventory");
var publicRoutes = require("./public");
var purchasingRoutes = require("./purchasing");
var reportRoutes = require("./report");
var authRoutes = require("./auth");
var salesRoutes = require("./sales");
var garmentPurchasingRoutes = require("./garment-purchasing");
var garmentMasterPlanRoutes = require("./garment-master-plan");
var migrationLog = require("./migration-log");
var garmentMasterPlanRoutes = require("./garment-master-plan");
var spinningRoutes = require("./spinning-production");
var intPurchasingRoutes = require("./int-purchasing");
var customsReportRoutes = require("./customs-report");
let expeditionRoutes = require("./expedition");
let merchandiserRoutes = require("./merchandiser");
let accountingRoutes = require("./accounting");
let weavingRoutes = require("./weaving");
let garmentProductionRoutes = require("./garment-production");
let packingSKUInventory = require("./packing-sku-inventory");
let customs = require("./customs");
let garmentShippingRoutes = require("./garment-shipping");
let garmentSubconRoutes = require("./garment-subcon");
let garmentFinance = require("./garment-finance");
let garmentDashboard = require("./garment-dashboard");
let dashboardDP = require('./dashboard-dp');
let garmentSampleRoutes = require("./garment-sample");

export default [].concat(
  publicRoutes,
  generalRoutes,
  masterRoutes,
  productionRoutes,
  spinningRoutes,
  purchasingRoutes,
  salesRoutes,
  inventoryRoutes,
  garmentPurchasingRoutes,
  garmentMasterPlanRoutes,
  garmentFinance,
  intPurchasingRoutes,
  customsReportRoutes,
  authRoutes,
  expeditionRoutes,
  merchandiserRoutes,
  migrationLog,
  reportRoutes,
  weavingRoutes,
  accountingRoutes,
  garmentProductionRoutes,
  garmentShippingRoutes,
  garmentSubconRoutes,
  garmentSampleRoutes,
  packingSKUInventory,
  customs,
  garmentDashboard,
  dashboardDP,
);
