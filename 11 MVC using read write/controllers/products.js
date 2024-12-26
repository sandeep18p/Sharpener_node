const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log("psoting")
  const product = new Product(req.body.title);
  console.log(product)
  product.save();
  res.redirect('/');
};

exports.getProducts = async (req, res, next) => {
  console.log("floe")
  const products = await Product.fetchAll();
  console.log(products,"pahuc")
  res.render('shop', {
    prods: products || [],
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products && products.length > 0,
    activeShop: true,
    productCSS: true
  });
};
