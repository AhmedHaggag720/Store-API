const Product = require('../models/product')

exports.getAllProductsStatic = async (req, res, next) => {
    const search = 'ab';
    const products = await Product.find({
        name: { $regex: search, $options: 'i' }
    });

    res.status(200).json({ products: products, nbHits: products.length })
}

exports.getAllProducts = async (req, res, next) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$;t',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|<=|>=|=)\b/g;
        let filters = numericFilters.replace(regEx,(match)=> `${operatorMap[march]}-`)
    }

    console.log(queryObject)
    let result = Product.find(queryObject);
    //sort
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
        //console.log(result)
    }
    else {
        result = result.sort('createdAt')
    }

    //fields
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const products = await result
    res.status(200).json({ products: products, nbHits: products.length })
}
