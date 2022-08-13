const cartItems = document.querySelector('.cart__items');

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

const getSkuFromProductItem = (item) => // Esta função esta retornando o sku em forma de string para addItemToCart.
  item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => { // Esta função quando chamada remove a li referente ao produto no cart atraves do metodo target e remove();
  // const li = document.querySelector('.cart__item');
   event.target.remove();
};

  const createCartItemElement = ({ sku, name, salePrice }) => { // createCartItemElement recebe os parametros da função addItemToCart e monta a estrutura do produto.
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
    li.addEventListener('click', cartItemClickListener); // Este escutador de eventos esta aguardando o click no produto do carrinho para chamar CartItemClickListner.
    return li;
  };

  const setProductsLocalStore = (element) => { // Esta função esta salvando o produto em localStore.
    saveCartItems(element);
  };

  const cartProductOnload = () => { // Jogando produtos no cart quando recarregar pagina.
    const productSaved = getSavedCartItems();
    cartItems.innerHTML = productSaved;
    cartItems.addEventListener('click', cartItemClickListener);
  };

const addItemToCart = async (event) => { // A função addItemToCart esta buscando os produtos e jogando no carrinho.
  const getSku = getSkuFromProductItem(event.target.parentNode);
  const cart = cartItems;
  const product = await fetchItem(getSku);
  const productItem = createCartItemElement({  
    sku: product.id, name: product.title, salePrice: product.price });
  cart.appendChild(productItem); 
  setProductsLocalStore(document.querySelector('.cart__items').innerHTML);
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
