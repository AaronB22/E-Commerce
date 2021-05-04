const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  try{
    const getCategories = await Category.findAll({
      include:[{ model:Product }]
    })
    res.status(200).json(getCategories)
  }catch(err){
    res.status(500).json(err)
  }
 
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const getCategories = await Category.findOne(
      {where:{id: req.params.id},
      include:[{ model:Product }]
      
    })

    res.status(200).json(getCategories)
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try{
    console.log(req.body)
    const newCategory= await Category.create(req.body);
    
    res.status(200).json(newCategory)
  }
  catch(err){res.status(500).json(err)}
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  try{
    console.log(req.body.category_name, req.params.id)
    const updateCategory= await Category.update(
      {category_name: req.body.category_name},
      {where: {id:req.params.id}, returning: true},
      );
    
    res.status(200).json(updateCategory)
  }
  catch(err){res.status(500).json(err)}
  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
      const deleteCategory= await Category.destroy({where:{id: req.params.id}})
    res.status(200).json(deleteCategory)
  }
  catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
