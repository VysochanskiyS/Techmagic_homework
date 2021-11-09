const express = require('express')
const router = express.Router()
const authors = [{
    id:0,
    name: 'John Doe',
    age: '30',
    post:[
        {id:0,text:"lalala"},
        {id:1,text:"trulala"}
    ]
  },
]

// get all authors
router.get('/', (req,res)=>{
    res.json(authors);
})


// delete
    router.delete('/delete/:id', (req,res,next)=>{
    const deleteId = authors.findIndex((item)=> item.id == req.params.id)
    if(deleteId != -1){
        authors.splice(deleteId,1)
        res.json(authors)
    }else{res.send("there no sush author");
   res.status(400).json("there no sush author")
    }
    next()
    })


    // rename 
router.put('/rename/:Idchange', (req,res)=>{
    const renameId = authors.findIndex((item)=> item.id = req.params.Idchange)
    console.log(renameId)
    if(renameId != -1){
        console.log(authors[renameId])
        authors[renameId].name = req.body.name;
        res.send(authors)
    }else{
        res.send("error")
    }
})

// add author 
router.post('/add', (req,res)=>{
 if(authors.includes((item)=>item.id = req.body.id)){
    res.send("authors with same id alredy exist")
    res.status = '500';
 }else{authors.push({...req.body})}
     res.json({authors})
})


// get all posts by author
router.get("/get-posts",(req,res,next)=>{
  authors.forEach(element => {
      if(element.id = req.body.id){
       res.send(element.post)
      }
  })
  next()
})


//  get one post by author
router.get("/get-posts/:idAuthor/:postId",(req,res,next)=>{
    authors.forEach(element => {
        if(element.id = req.params.idAuthor){
            if(element.post.find(item=>item.id == req.params.postId)){
                res.send(element.post[req.params.postId])
            }else{res.send("no such post ")}
        }else{
            res.send("no such a authors posts")
        }
    })
    next()
})


module.exports = router;       
