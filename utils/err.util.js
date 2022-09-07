const handleResError = (res, err, statusCode) => {
    return res.status(statusCode).json({
        message: err.message
    })
}

module.exports = { handleResError }