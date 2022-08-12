const fetchItem = async (id) => {
  const urlItem = `https://api.mercadolibre.com/items/${id}`;
  const promise = await fetch(urlItem);
  const results = await promise.json();
  // console.log(results);
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
