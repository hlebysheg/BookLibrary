const {Router} = require('express')
const config = require('config')
const Book = require('../models/Book')
const User = require("../models/User");
const router = Router()

// /api/books
router.post(
    '/post-book',
    async (req, res)=>{
        try {

            const {name, author, description, photo, bookRef, genre} = req.body
            // console.log(req.json)
            const book = new Book({name, author, description, photo, bookRef, genre})
            await book.save()

            res.status(201).json({message: 'Книга создана'})
        }
        catch (e){
            res.status(500).json({message: `Error: ${e.message}`})
        }
    })


// /api/books
router.get(
    '/get-book',
    async (req, res) => {
        try {
            const {pageNum, booksNum} = req.query
            //clicks
            const {id} = req.query
            if(id) {
                const book = await Book.findOneAndUpdate({_id: id}, {
                    $inc: { clicks: 1 }
                }, {new: true })

                return res.json(book)
            }
            //
            const bookNum = await Book.find().count()
            const books = await Book.find()
                .select("-__v")
                .sort({_id:-1})
                .skip((pageNum-1) * booksNum)
                .limit(Number(booksNum))
            res.json({books, bookNum})
        } catch (e) {
            res.status(500).json({message: `Error: ${e.message}`})
        }
    }
)

// /api/books
router.get(
    '/get-book-by-genre',
    async (req, res) => {
        try {
            const {pageNum, booksNum, genre} = req.query
            // console.log(req)
            const bookNum = await Book.find({genre: genre}).count()
            const books = await Book.find({genre: genre})
                .select("-__v")
                .sort({_id:-1})
                .skip((pageNum-1) * booksNum)
                .limit(Number(booksNum))
            res.json({books, bookNum})
        } catch (e) {
            res.status(500).json({message: `Error: ${e.message}`})
        }
    }
)

router.get(
    '/find-book',
    async (req, res) => {
        try {
            const {pageNum, booksNum, name} = req.query
            // console.log(req)
            const bookNum = await Book.find({name: name}).count()
            const books = await Book.find({name: name})
                .select("-__v")
                .sort({_id:-1})
                .skip((pageNum-1) * booksNum)
                .limit(Number(booksNum))
            res.json({books, bookNum})
        } catch (e) {
            res.status(500).json({message: `Error: ${e.message}`})
        }
    }
)

//add favourite books add
router.post(
    '/my-books-add',
    async (req, res)=>{
        try {

            const {userId, bookId} = req.body

            const candidate = await User.findOne({_id: userId})
            candidate.books.push(bookId)

            await candidate.save()

            res.status(201).json({myBooks: candidate.books})
        }
        catch (e){
            res.status(500).json({message: `Error: ${e.message}`})
        }
    })

//del my fav books
router.post(
    '/my-books-del',
    async (req, res)=>{
        try {

            const {userId, bookId} = req.body

            const candidate = await User.findOne({_id: userId})
            candidate.books.pull(bookId)
            await candidate.save()

            res.status(201).json({myBooks: candidate.books})
        }
        catch (e){
            res.status(500).json({message: `Error: ${e.message}`})
        }
    })

//get my fav books
router.post(
    '/my-books-get',
    async (req, res)=>{
        try {

            const {userId} = req.body

            const candidate = await User.findOne({_id: userId})

            res.status(201).json({myBooks: candidate.books})
        }
        catch (e){
            res.status(500).json({message: `Error: ${e.message}`})
        }
    })

router.post(
    '/my-books-get-all',
    async (req, res)=>{
        try {

            let {myBooks} = req.body

            let records = []
            //const records = await Book.find({ '_id': { $in: myBooks } });

            myBooks = myBooks.reverse()

            for(let i = 0; i < myBooks.length; i++) {
                let element = await Book.find({_id: myBooks[i]});
                records.push(...element)
            }

            res.status(201).json({myBooks: records})
        }
        catch (e){
            res.status(500).json({message: `Error: ${e.message}`})
        }
    })

module.exports  = router