var pubsub = (function () {
  var events = {};

  return {
    subscribe: function (event, listener) {
      events[event] = events[event] || [];
      events[event].push(listener);
    },
    publish: function (event, info) {
      events[event].forEach(function(item) {
        item(info ? info : {});
      })
    }
  }
})();

var cart = (function(pubsub) {
  var products = [];

  return {
    addProduct: function (product) {
      products.push(product);
      pubsub.publish('new-product', this.getTotal());
      pubsub.publish('promotion-check', product);
    },
    getProducts: function () {
      return products;
    },
    getTotal: function () {
      return products.reduce(function (total, product) {
        return total += parseInt(product.price, 10);
      }, 0);
    }
  };
}(pubsub));

var carui = (function (pubsub) {
  pubsub.subscribe('new-product', function (total) {
    console.log('Toal cost: ', total)
  });
}(pubsub));

var promote = (function (pubsub) {
  pubsub.subscribe('promotion-check', function (product) {
    if (product.name === 'iPad') {
      console.log('iPad3 is out!');
    }
  });
}(pubsub));

cart.addProduct({name: 'xiaomi', price: 399});
cart.addProduct({name: 'iPad', price: 699});