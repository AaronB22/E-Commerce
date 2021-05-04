const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async(req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try{
    const getProduct = await Product.findAll({
      include:[{ model:Tag }, {model:Category}]
    })
    res.status(200).json(getProduct)
  }catch(err){
    res.status(500).json(err)
  }
});

// get one product
router.get('/:id', async(req, res) => {
  try{
    const getProduct = await Product.findAll({
      where:{id: req.params.id},
      include:[{ model:Tag }, {model:Category}]
    })
    res.status(200).json(getProduct)
  }catch(err){
    res.status(500).json(err)
  }
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', async(req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try{
    console.log(req.body)
    const newProduct= await Product.create(req.body);
    
    res.status(200).json(newProduct)
  }
  catch(err){res.status(500).json(err)}
  
});

// update product
router.put('/:id',async (req, res) => {
  

  try{
    
    const updateProduct= await Product.update(
      
      {product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id
    },
      {where: {id:req.params.id}, returning: true},
      );
    
    res.status(200).json(updateProduct)
  }
  catch(err){
    res.status(500).json(err)
    console.log(err)
  }
});

router.delete('/:id',async (req, res) => {
  // delete one product by its `id` value
  try{
    const deleteProduct= await Product.destroy({where:{id: req.params.id}})
  res.status(200).json(deleteProduct)
}
catch(err){
  res.status(500).json(err)
}
});

module.exports = router;
