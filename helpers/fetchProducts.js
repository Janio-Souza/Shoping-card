const fetchProducts = async () => {
  try {
  const urlApi = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const promise = await fetch(urlApi);
  const results = await promise.json();
  const data = results.results;
  return data;
} catch (error) {
  return error
};
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
