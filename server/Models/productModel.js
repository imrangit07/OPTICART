const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  is_primary: { type: Boolean, default: false }
});

const RatingSchema = new mongoose.Schema({
  average: { type: Number, default: 0 },
  count: { type: Number, default: 0 }
});

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  stock_quantity: {
    type: Number,
    required: true,
    min: 0
  },
  is_active: {
    type: Boolean,
    default: true
  },
  categories: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: null
  },
  images: [ImageSchema],
  ratings: RatingSchema
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
