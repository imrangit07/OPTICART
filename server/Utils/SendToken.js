exports.sendtoken = async (user, statusCode, res) => {
    const token = await user.getjwttoken();
    // console.log("in sendtoken:",token);

    const options = {
        exipres: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000), // 1 DAYS
        httpOnly: true,
        // secure: false
    }

    res.status(statusCode).cookie("token", token, options).json({ success: true, id: user._id, token: token })
    // res.json({ token });
};