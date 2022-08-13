const cartItems = document.querySelector('.cart__items');
const subTotal = document.querySelector('.total-price');
let totalPrice = 0;

const createProductImageElement = (imageSource) => { // Esta função retorna uma tag de imagem.
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};
const createCustomElement = (element, className, innerText) => { // Esta função retorna um elemento html personalizado conforme os parametros passados.
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const setProductsLocalStore = (element) => { // Esta função esta salvando o produto em localStore.
  saveCartItems(element);
};

const getSkuFromProductItem = (item) => // Esta função esta retornando o sku em forma de string para addItemToCart.
  item.querySelector('span.item__sku').innerText;

// subTotal.appendChild(createCustomElement('div', 'sub-total', totalPrice)); // Rever forma de criação deste item.

const sumSubtotalCart = (price) => { // Esta função soma os produtos ao serem adicionados para atualiza o total a pagar do carrinho. 
  totalPrice += price;
  const priceRound = Math.round(totalPrice * 100) / 100;
  subTotal.innerHTML = priceRound;
  localStorage.setItem('subTotal', priceRound);
};

const updateLocalStorage = async () => { // updateLocalStorage atualiza o localStorage quando é retirado um item do cart.
  await localStorage.removeItem('cartItems');
  localStorage.setItem('cartItems', cartItems.innerHTML);
};

const cartItemClickListener = (event) => { // Esta função remove um item do cart e atualiza seu preço, tanto na pagina quanto no local storage.
  const eventArmazenado = event.target.innerText;
  const priceParse = eventArmazenado.split('$')[1];
  totalPrice = localStorage.getItem('subTotal');
  totalPrice = Number(totalPrice) - priceParse;
  const priceRound = Math.round(totalPrice * 100) / 100;
  subTotal.innerHTML = priceRound;
  localStorage.setItem('subTotal', priceRound);
  updateLocalStorage(); 
   event.target.remove();
};

  const createCartItemElement = ({ sku, name, salePrice }) => { // createCartItemElement recebe os parametros da função addItemToCart e monta a estrutura do produto.
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
    li.addEventListener('click', cartItemClickListener); // Este escutador de eventos esta aguardando o click no produto do carrinho para chamar CartItemClickListner.
    return li;
  };

  const cartProductOnload = () => { // Jogando produtos no cart quando recarregar pagina.
    const productSaved = getSavedCartItems();
    cartItems.innerHTML = productSaved;
    subTotal.innerHTML = localStorage.getItem('subTotal');
    const productsInCart = cartItems.childNodes;
    productsInCart.forEach((products) => products.addEventListener('click', cartItemClickListener));
  };

const addItemToCart = async (event) => { // A função addItemToCart esta buscando os produtos e jogando no carrinho.
  const getSku = getSkuFromProductItem(event.target.parentNode);
  const cart = cartItems;
  const product = await fetchItem(getSku);
  const productItem = createCartItemElement({  
    sku: product.id, name: product.title, salePrice: product.price });
  cart.appendChild(productItem); 
  setProductsLocalStore(document.querySelector('.cart__items').innerHTML);
  sumSubtotalCart(product.price);
  };

const createProductItemElement = ({ sku, name, image }) => { // Esta função esta responsalvel por criar os produtos, utiliza as funções creatCustomElement e creatProductImageElement.
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
const fetchProductsElement = async (product) => { // FetchProductsElement isere os produtos criados por createProductItemElement na pagina
  const products = await fetchProducts(product);
  const items = document.querySelector('.items');
  const resultsProducts = products.results;
  return resultsProducts.forEach((elementos) => {
    const { id, title, thumbnail } = elementos;
    return items.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

window.onload = async () => {
 await fetchProductsElement('computador'); 
  cartProductOnload();
};
