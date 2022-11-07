exports.getAllProductsStatic = async (req, res, next) => {
    //throw new Error('testing')
    res.status(200).json({ msg: 'products testing route' })
}

exports.getAllProducts = async (req, res, next) => {
    res.status(200).json({ msg: 'products route' })
}
