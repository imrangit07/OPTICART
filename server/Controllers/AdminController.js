const { catchAsyncErrors } = require("../middleware/catchAsynError");
const AdminModel = require("../Models/AdminModel");
const productModel = require("../Models/productModel");
const ProductModel = require("../Models/productModel");
const { cloudinary } = require("../Utils/cloudinary")

const jwt = require("jsonwebtoken");

const adminLogin = catchAsyncErrors(async (req, res) => {
  const { adminId, adminPassword } = req.body;

  const adminData = await AdminModel.findOne({ adminId:adminId });
  

  if (!adminData) {
    return res.status(404).json({ message: "Admin not found" });
  }

  if (adminData.adminPassword !== adminPassword) {
    return res.status(400).json({ message: "Admin password is wrong" });
  }


  const token = jwt.sign(
    { adminId: adminData._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );



  res.status(200).json({ message: "Admin logged in successfully", adminData: adminData.adminId });


});

//This is for Add New Product data
const AddNewProducts = catchAsyncErrors(async (req, res) => {

  const {
    name,
    description,
    price,
    sku,
    stock_quantity,
    is_active,
    categories,
    color,
    average,
    count,
  } = req.body;

  const images = (req.uploadedFiles || []).map(file => ({
    url: file.url,
    public_id: file.public_id,
    is_primary: false 
  }));



  const ratings = { average: average, count: count };

  const newProduct = new ProductModel({
    name,
    description,
    price: Number(price),
    sku,
    stock_quantity: Number(stock_quantity),
    is_active: is_active === 'true',
    categories,
    color,
    ratings,
    images
  });

  await newProduct.save();

  res.status(200).json({
    success: true,
    message: 'Product saved successfully',
    product: newProduct
  });
});

// This is for show all product data
const getAllProducts = catchAsyncErrors(async (req, res) => {

  const allProducts = await ProductModel.find();

  // console.log(allProducts);

  res.status(200).json({
    success: true,
    message: 'Product Get successfully',
    product: allProducts
  });

});


//This is for Delete product data
const deleteProduct = catchAsyncErrors(async (req, res) => {
  const { id } = req.query;
  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  // Loop over images and delete from Cloudinary
  if (product.images && product.images.length > 0) {
    for (const image of product.images) {
      // console.log("check : ", image.public_id);

      // Public_id is importent for deleteing images from Cloudinary.store in database
      if (image.public_id) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Product and its images deleted successfully'
  });
});

const editProduct = catchAsyncErrors(async (req, res) => {
  const { id } = req.query;
  const productData = await productModel.findOne({ _id: id })
  // console.log(productData);

  if (!productData) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  res.status(200).json({
    success: true,
    message: 'Product and its images deleted successfully',
    product: productData,
  });

})


//This is for Updating Product

const updateProduct = catchAsyncErrors(async (req, res) => {
  const { id } = req.query;
  // console.log(req.body, id);

  const { name, price, categories, stock_quantity } = req.body;

  const productData = await productModel.findByIdAndUpdate(id, {
    name, price, categories, stock_quantity
  })

  if (!productData) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  res.status(200).json({
    success: true,
    message: 'Product Updated successfully',
    product: productData,
  });

})

module.exports = {
  adminLogin,
  AddNewProducts,
  getAllProducts,
  deleteProduct,
  editProduct,
  updateProduct
};
