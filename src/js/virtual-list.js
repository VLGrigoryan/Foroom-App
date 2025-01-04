import generateImageLinkByName from './utils.js';

function renderParam(param) {
  const { name, val, mesure, options } = param;

  if (options && options.length) {
    const optionValues = options.map((option) => option.name).join(', ');
    return `<li class="list-row"><strong>${name}</strong>: ${optionValues}</li>`;
  }

  const paramValue = val !== undefined ? `${val} ${mesure || ''}` : 'N/A';
  return `<li class="list-row"><strong>${name}</strong>: ${paramValue}</li>`;
}

function createVirtualList(app, products) {
  const virtualList = app.virtualList.create({
    el: '.virtual-list',
    items: products,
    itemHeight: 500,
    itemWidth: 500,
    renderItem: function (item) {
      const paramsHTML = item.params.map((param) => renderParam(param)).join('');
      const imageUrl = generateImageLinkByName(item.name);

      return `
      <li class="col-xs-12 col-sm-6 col-md-3 card-item">
        <div class="item-grid grid-type-4">
          <div class="product">
            <div class="product-thumbnails">
              <a href="#"><h2 class="woocommerce-loop-product__title">${item.nameRu}<br>${item.name}</h2></a>
              <a href="#"><img src="${imageUrl}" alt="${item.name}" /></a>
            </div>
            <div class="btn-cart-in">
              <ul>
                <li class="foroom-btn-cart-2 btn-addtocart card-icon">
                  <a class="add_to_cart_button" title="Add to cart">Add to cart</a>
                </li>
                <li class="btn-wishlist card-icon">
                  <a class="add_to_wishlist" title="Add to wishlist"><i class="Pe-icon-7-stroke-like"></i></a>
                </li>
                <li class="btn-compare card-icon">
                  <a class="compare" title="Compare"><i class="Pe-icon-7-stroke-copy-file"></i></a>
                </li>
                <li class="btn-view card-icon">
                  <a class="quick-view" title="Quick View"><i class="Pe-icon-7-stroke-search"></i></a>
                </li>
              </ul>
            </div>
            <ul class="card-description description-unvisable">
              ${paramsHTML}
            </ul>
          </div>
        </div>
      </li>`;
    },
  });

  virtualList.update();
}

export { createVirtualList };
