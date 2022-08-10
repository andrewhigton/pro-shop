import express from 'express'
// import asyncHandler from 'express-async-handler';
const router = express.Router()
import Product from '../models/productModel.js';
import {
  getProducts,
  getProductById,
  // deleteProduct,
  // createProduct,
  // updateProduct,
  // createProductReview,
  // getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

//@desc fetch all products
//@route GET /api/products
//@access public

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

// router.route('/').get(getProducts).post(protect, admin, createProduct)
// router.route('/:id/reviews').post(protect, createProductReview)
// router.get('/top', getTopProducts)
// router
//   .route('/:id')
//   .get(getProductById)
//   .delete(protect, admin, deleteProduct)
//   .put(protect, admin, updateProduct)

export default router