const fetchProducts = async () => {
  const urlApi = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const promise = await fetch(urlApi);
  const results = await promise.json();
  const data = results.results;
  // console.log('Log dentro da func fetchProducts', data);
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
