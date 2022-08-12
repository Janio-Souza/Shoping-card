const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getSkuFromProductItem = (item) =>
  item.querySelector('span.item__sku').innerText;

  const createCartItemElement = ({ sku, name, salePrice }) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
    li.addEventListener('click', cartItemClickListener);
    return li;
  };

// const cartItemClickListener = (event) => {
//     // coloque seu código aqui
// };

const addItemToCart = async (event) => {
  const getSku = getSkuFromProductItem(event.target.parentNode);
  const cart = document.querySelector('.cart__items');
  const product = await fetchItem(getSku);
  return cart.appendChild(createCartItemElement({ 
    sku: product.id, name: product.title, salePrice: product.price }));
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btnSetProduct = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btnSetProduct.addEventListener('click', addItemToCart);
  section.appendChild(btnSetProduct);

  return section;
};
const fetchProductsElement = async (product) => {
  const products = await fetchProducts(product);
  const items = document.querySelector('.items');
  const resultsProducts = products.results;
  return resultsProducts.forEach((elementos) => {
    const { id, title, thumbnail } = elementos;
    return items.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

window.onload = () => fetchProductsElement('computador');
