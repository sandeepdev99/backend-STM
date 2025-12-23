import Product from '../models/product.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, stock, category, description } = req.body;

  if (!name || price == null || stock == null || !category) {
    throw new ApiError(400, 'Required fields missing');
  }

  const product = await Product.create({
    name,
    price,
    stock,
    category,
    description,
  });

  res.status(201).json(
    new ApiResponse(201, product, 'Product created successfully')
  );
});


export const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    search,
  } = req.query;

  const query = { isActive: true };

  if (category) {
    query.category = category;
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(query);

  res.status(200).json(
    new ApiResponse(200, {
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    })
  );
});


export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || !product.isActive) {
    throw new ApiError(404, 'Product not found');
  }

  res.status(200).json(new ApiResponse(200, product));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.status(200).json(
    new ApiResponse(200, product, 'Product updated')
  );
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.status(200).json(
    new ApiResponse(200, null, 'Product removed')
  );
});
