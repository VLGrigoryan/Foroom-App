import $ from 'dom7';
import Framework7, { getDevice } from 'framework7/bundle';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'framework7/css/bundle';
import './css/icons.css';
import './css/app.scss';
import './css/Pe-icon-7-stroke.min.css';
import './css/modal-popup.css';

import cordovaApp from './js/cordova-app.js';
import routes from './js/routes.js';
import store from './js/store.js';
import App from './app.f7';
import { fetchProductData } from './js/api.js';
import initializeModal from './js/modal.js';
import { createVirtualList } from './js/virtual-list.js';
import { generateNavbarMenu } from './js/utils.js';

const device = getDevice();

const app = new Framework7({
  name: 'Foroom App',
  theme: 'auto',
  el: '#app',
  component: App,
  store: store,
  routes: routes,
  input: {
    scrollIntoViewOnFocus: device.cordova,
    scrollIntoViewCentered: device.cordova,
  },
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      const f7 = this;

      $(document).on('page:init', function () {
        const navbarMenuContainer = $('.navbar-menu');
        if (navbarMenuContainer.length > 0) {
          navbarMenuContainer.html(generateNavbarMenu());
        }
      });

      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }

      const shouldFetchFromZip = true;

      fetchProductData(shouldFetchFromZip).then(products => {
        console.log(`Fetched products from ${shouldFetchFromZip ? 'ZIP' : 'JSON'}:`, products);
        createVirtualList(app, products);
      }, (error) => {
        console.error(`Error downloading and extracting ${shouldFetchFromZip ? 'ZIP' : 'JSON'}:`, error);
        app.dialog.alert('Не удалось загрузить продукты. Пожалуйста, попробуйте снова позже.');
      });

      initializeModal();
    },
  },
  debug: true,
});

export default app;
