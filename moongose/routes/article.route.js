const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router.post('/', articleController.createArticle);
router
    .get("/articles",articleController.getArticle)
    .put('/:articleId', articleController.updateArticle)
    .delete('/articleId', articleController.deleteArticle)
   
module.exports = router;
