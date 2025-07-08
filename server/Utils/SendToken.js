exports.sendtoken = async (user, statusCode, res) => {
    const token = await user.getjwttoken();
    // console.log("in sendtoken:",token);
 
 
    const options = {
        expires: new Date(
            Date.now() + 1* 24 * 60 * 60 * 1000), // 1 DAYS
        // httpOnly: true,
        // secure: false
    }

    res.status(statusCode).cookie("token", token, options).json({ success: true, id: user._id,userName:user.userName, token: token })
    // res.json({ token });
};