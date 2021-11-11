'use strict';

const _ = require('lodash');
const utilError = require("../config/errorHelper");
const Article = require('../models/article')

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    getArticle
};

async function createArticle(req, res, next) {

    const fields = [
        'title',
        'description'
    ];

    const body = req.body;
    console.log("body",body);
    const newArticle = _.pick(body, fields);
    console.log("newArticle",newArticle);
    try {
        // const existingArticle = await Article.findOne({})
        // console.log("All--------",existingArticle);
        // if (existingArticle) {
        //     throw utilError.badRequest('Article exists');
        // }
        const article = new Article(newArticle);
        await article.save();
        console.log('Article=========',article)
        return res.status(200).json(article);
    } catch (err) {
        console.log(err);
        next(err);
    }

}


async function updateArticle(req, res, next) {
    const articleId = req.params.articleId;
    const body = req.body;

    try {
        const existingArticle = await Article.findOne({_id: articleId})
        if (!existingArticle) {
            throw utilError.badRequest('Article not exists');
        }

        if (body.title) {
            existingArticle.title = body.title;
        }
        if (body.description) {
            existingArticle.description = body.description;
        }

        await existingArticle.save();
        return res.status(200).json(existingArticle);
    } catch (err) {
        console.log(err);
        next(err);
    }
}


async function deleteArticle(req, res, next) {

    const articleId = req.params.articleId;

    try {
        const result = await Article.findByIdAndDelete(articleId)
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function getArticle(req, res, next) {

    try {
        console.log("ressssssssss")
        const existingArticle = await Article.findOne({_id: articleId})
        console.log("result==========",result);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
}




