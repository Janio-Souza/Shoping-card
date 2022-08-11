const fetchProducts = async (product) => {
  const urlApi = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const promise = await fetch(urlApi);
  const results = await promise.json();
  // const data = results.results;
  const data = results;
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
