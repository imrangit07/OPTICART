const adminLogin = catchAsyncErrors(async (req, res) => {
  const { adminId, adminPassword } = req.body;

  const adminData = await AdminModel.findOne({ adminId });

  if (!adminData) {
    return res.status(404).json({ message: "Admin not found" });
  }

  if (adminData.adminPassword !== adminPassword) {
    return res.status(400).json({ message: "Admin password is wrong" });
  }

  const token = jwt.sign(
    { adminId: adminData._id, role: adminData.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    message: "Admin logged in successfully",
    token, // send token to frontend
    role: adminData.role
  });
});
