export default function generateImageLinkByName(name) {
  const imageUrlMapping = {
    "INTEGRA PLISSE": "https://www.foroom.ru/img-new/catalog/products/plisse.webp",
    "INTEGRA G-FORM": "https://www.foroom.ru/img-new/catalog/products/integra_g_form.webp",
    "INTEGRA BOX": "https://www.foroom.ru/img-new/catalog/products/integra_box.webp",
    "INTEGRA BOX+": "https://www.foroom.ru/img-new/catalog/products/integra_box_plus.webp",
    "INTEGRA BOX DUO": "https://www.foroom.ru/img-new/catalog/products/integra_box_duo.webp",
    "INTEGRA SLIM": "https://www.foroom.ru/img-new/catalog/products/integra_slim.webp",
    "INTEGRA SLIM DUO": "https://www.foroom.ru/img-new/catalog/products/integra_slim_duo.webp",
    "Каталоги": "https://www.foroom.ru/img-new/catalog/products/integra_slim_duo.webp",
    "Аксессуары для моторизации": "https://www.foroom.ru/img-new/catalog/products/integra_slim_duo.webp",
    "Торговое оборудование": "https://www.foroom.ru/img-new/catalog/products/integra_slim_duo.webp",
    "CLIC": "https://www.foroom.ru/img-new/catalog/products/clic_new.webp",
    "CLIC (NEW)": "https://www.foroom.ru/img-new/catalog/products/clic_new.webp",
    "CLIC BOX": "https://www.foroom.ru/img-new/catalog/products/clic_box.webp",
    "CLIC DUO": "https://www.foroom.ru/img-new/catalog/products/clic_duo.webp",
    "CLIC BOX DUO": "https://www.foroom.ru/img-new/catalog/products/clic_box_duo.webp",
    "ROLL": "https://www.foroom.ru/img-new/catalog/products/roll.webp",
    "GRANDE": "https://www.foroom.ru/img-new/catalog/products/grande.webp",
    "GRANDE MAX": "https://www.foroom.ru/img-new/catalog/products/grande-max.webp",
    "GRANDE BOX": "https://www.foroom.ru/img-new/catalog/products/grande_box.webp",
    "GRANDE BOX DUO": "https://www.foroom.ru/img-new/catalog/products/grande_box_duo.webp",
    "V-FORM": "https://www.foroom.ru/img-new/catalog/products/v_form.webp",
    "V-FORM PLAST": "https://www.foroom.ru/img-new/catalog/products/v_form_plust.webp",
    "ROMA": "https://www.foroom.ru/img-new/catalog/products/roma.webp",
    "INTEGRA ROMA": "https://www.foroom.ru//_images/bestsellers/introma1.webp",
    "Карниз INTEGRA ROMA": "https://www.foroom.ru/img/images/nf_foroom/goods-static/roma1-30005906.png.webp",
    "G-FORM": "https://www.foroom.ru/img-new/catalog/products/g_form.webp",
    "Ткань V-FORM": "https://www.foroom.ru/img-new/catalog/products/v_form.webp",
    "Пластик V-FORM PLAST": "https://www.foroom.ru/img-new/catalog/products/v_form_plust.webp",
    "Карниз V-FORM": "https://www.foroom.ru/img-new/catalog/products/karniz-i-profile.webp",
    "Круглый карниз": "https://www.foroom.ru/img-new/catalog/products/karniz-i-profile.webp",
    "COMFORT Слип": "https://www.foroom.ru/img-new/catalog/products/karniz-slip.webp",
    "COMFORT Универсал": "https://www.foroom.ru/img-new/catalog/products/karniz-universal.webp",
    "Римская штора": "https://www.foroom.ru/img-new/catalog/products/karniz-i-profile.webp",
    "Французская штора": "https://www.foroom.ru/img-new/catalog/products/karniz-i-profile.webp",
    "Тюль": "https://www.foroom.ru/img-new/catalog/products/karniz-i-profile.webp",
    "Колибри": "https://www.foroom.ru/img-new/catalog/products/karniz-i-profile.webp",
    "Барс": "https://www.foroom.ru/img-new/catalog/products/karniz-i-profile.webp",
    "COMFORT I-Профиль": "https://www.foroom.ru/img-new/catalog/products/karniz-i-profile.webp",
    "G-FORM WOOD 50": "https://www.foroom.ru/img-new/catalog/products/wood.webp",
  };

  return imageUrlMapping[name] || "https://www.foroom.ru/img-new/catalog/products/default.webp"; // Default fallback
}


export function renderParam(param) {
  const { name, val, mesure, options } = param;

  if (options && options.length) {
    const optionValues = options.map((option) => option.name).join(', ');
    return `<li class="list-row"><strong>${name}</strong>: ${optionValues}</li>`;
  }

  const paramValue = val !== undefined ? `${val} ${mesure || ''}` : 'N/A';
  return `<li class="list-row"><strong>${name}</strong>: ${paramValue}</li>`;
}


export const extractProductDetails = (productElement) => {
  const name = productElement.querySelector('.woocommerce-loop-product__title')?.textContent || 'Product Name';
  const image = productElement.querySelector('img')?.src || '';
  const detailsHTML = [...productElement.querySelectorAll('.list-row')]
    .map((row) => `<li>${row.innerHTML}</li>`)
    .join('');

  return { name, image, detailsHTML };
};


// navbar-menu.js

export const generateNavbarMenu = () => {
  const createNavbarMenuItem = (href, imgSrc, imgAlt, imgTitle, text) => `
    <div class="navbar-menu__item">
      <a href="${href}" class="navbar-item">
        <img class="navbar-item-icon" src="${imgSrc}" alt="${imgAlt}" title="${imgTitle || ''}" />
        <span class="navbar-menu__item-heading">${text}</span>
      </a>
    </div>
  `;

  const navbarMenuItems = [
    {
      href: "/catalog/shtory-plisse",
      imgSrc: "/images/icon/plisse-ico.svg",
      imgAlt: "Шторы Плиссе",
      text: "Шторы Плиссе",
    },
    {
      href: "/catalog/rulonnye-shtory",
      imgSrc: "/images/icon/duo-ico.svg",
      imgAlt: "рулонные шторы от FOROOM",
      imgTitle: "ассортимент рулонных штор на окна",
      text: "Рулонные шторы",
    },
    {
      href: "/catalog/rulonnye-shtory-duo",
      imgSrc: "/images/icon/duo-ico.svg",
      imgAlt: "рулонные шторы DUO от FOROOM",
      imgTitle: "ассортимент рулонных штор DUO на окна",
      text: "Рулонные шторы DUO",
    },
    {
      href: "/catalog/vertikalnye-zhalyuzi",
      imgSrc: "/images/icon/vblinds-ico.svg",
      imgAlt: "вертикальные жалюзи от FOROOM",
      imgTitle: "ассортимент вертикальных жалюзи на окна",
      text: "Вертикальные жалюзи",
    },
    {
      href: "/catalog/gorizontalnye-zhalyuzi",
      imgSrc: "/images/icon/hblinds-ico.svg",
      imgAlt: "горизонтальные жалюзи от FOROOM",
      text: "Горизонтальные жалюзи",
    },
    {
      href: "/catalog/gorizontalnye-derevyannie-zhalyuzi",
      imgSrc: "/images/icon/wood-ico.svg",
      imgAlt: "деревянные жалюзи от FOROOM",
      imgTitle: "ассортимент деревянных жалюзи на окна",
      text: "Горизонтальные деревянные жалюзи",
    },
    {
      href: "/catalog/rimskie-shtory",
      imgSrc: "/images/icon/roma-ico.svg",
      imgAlt: "римские шторы от FOROOM",
      imgTitle: "ассортимент римских штор от FOROOM на окна",
      text: "Римские шторы",
    },
    {
      href: "/catalog/profilnye-karnizy",
      imgSrc: "/images/icon/profileCornices-ico.svg",
      imgAlt: "профильные карнизы от FOROOM",
      imgTitle: "ассортимент профильных карнизов",
      text: "Профильные карнизы",
    },
  ];

  return navbarMenuItems
    .map(item => createNavbarMenuItem(item.href, item.imgSrc, item.imgAlt, item.imgTitle, item.text))
    .join("");
};
