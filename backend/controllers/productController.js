const Product = require("../models/productModel.js");
const expressAsyncHandler = require("express-async-handler");

const lmt = 12;
const searchProducts = expressAsyncHandler(async (req, res) => {
  const limit = req.query.limit || lmt;
  const page = req.query.page || 1;
  const category = req.query.category || "";
  const price = req.query.price || "";
  const rating = req.query.rating || "";
  const order = req.query.order || "";
  const query = req.query.query || "";
  const queryFilter =
    query && query !== "all"
      ? {
          $or: [
            {
              name: {
                $regex: query,
                $options: "i",
              },
            },
            {
              category: {
                $regex: query,
                $options: "i",
              },
            },
          ],
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};

  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};
  const sortOrder =
    order === "featured"
      ? { featured: -1 }
      : order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };
  const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .sort(sortOrder)
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  res.send({
    countProducts,
    page,
    pages: Math.ceil(countProducts / limit),
    products,
  });
});

const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find();
  if (products) {
    res.send(products);
  } else {
    res.status(404).send({ message: "Products Not Found" });
  }
});

const getProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Category Not Found" });
  }
});

const createProduct = expressAsyncHandler(async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    slug: req.body.slug,
    picture: req.body.picture,
    price: req.body.price,
    category: req.body.category,
    rating: 0,
    numReviews: 0,
    description: req.body.description,
  });
  const product = await newProduct.save();
  res.send({ message: "Product Created", product });
});

const updateProduct = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name || product.name;
    product.slug = req.body.slug || product.slug;
    product.price = req.body.price || product.price;
    product.picture = req.body.picture || product.picture;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.soldout = Boolean(req.body.soldout);
    await product.save();
    res.send({ message: "Product Updated" });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: "Product Deleted" });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const createReview = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (product.reviews.find((x) => x.name === req.user.name)) {
      return res
        .status(400)
        .send({ message: "You already submitted a review" });
    }
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      message: "Review Created",
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      numReviews: product.numReviews,
      rating: product.rating,
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const addColour = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    const colour = req.body.colour;
    product.colours.push(colour);
    const updatedProduct = await product.save();
    res.status(201).send({
      message: "colour is added",
      colour: updatedProduct.colours[updatedProduct.colours.length - 1],
      colours: updatedProduct.colours,
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProducts,
  searchProducts,
  createReview,
  addColour,
};
