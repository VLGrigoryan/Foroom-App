import { extractProductDetails } from './utils.js';

export default function initializeModal() {

    const closeModal = (modal) => {
        modal.classList.remove('open');
    };

    const openModal = (product, modalContent, modal) => {
        populateModal(product, modalContent);
        modal.classList.add('open');
    };

    const populateModal = (product, modalContent) => {
        modalContent.title.textContent = product.name;
        modalContent.image.src = product.image || '';
        modalContent.details.innerHTML = product.detailsHTML;
    };

    document.addEventListener('DOMContentLoaded', () => {
        const elements = {
            virtualList: document.querySelector('.virtual-list'),
            modal: document.querySelector('#yith-quick-view-modal'),
        };

        if (!elements.virtualList || !elements.modal) {
            console.error('Virtual list or modal not found in the DOM.');
            return;
        }

        const modalContent = {
            overlay: elements.modal.querySelector('.yith-quick-view-overlay'),
            title: elements.modal.querySelector('.product-title'),
            image: elements.modal.querySelector('.product img'),
            details: elements.modal.querySelector('.product .product-details'),
            closeButton: elements.modal.querySelector('.yith-quick-view-close'),
        };

        const handleProductClick = (event) => {
            const target = event.target;
            if (target.classList.contains('woocommerce-loop-product__title') || target.tagName === 'IMG') {
                const productElement = target.closest('.item-grid');
                if (!productElement) return;
                const product = extractProductDetails(productElement);
                openModal(product, modalContent, elements.modal);
            }
        };

        elements.virtualList.addEventListener('click', handleProductClick);
        modalContent.closeButton.addEventListener('click', () => closeModal(elements.modal));
        modalContent.overlay.addEventListener('click', () => closeModal(elements.modal));
    });
}
