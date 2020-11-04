const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res, next) => {
    // res.json({test: 'test'});
    try {
        let results = await db.all();
        res.json(results);
    } catch(e) {   
        console.log(e);
        res.sendStatus(500);
    }
}); 

router.get('/:id', async (req, res, next) => {
    try {
        let result = await db.one(req.params.id);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/', async (req, res, next) => {
    if(!req.body.first_name || !req.body.last_name) return res.status(422).json('First name and last name fields cant be empty!');
    try {
        await db.create(`'${req.body.first_name}', '${req.body.last_name}'`);    
        res.status(200).json(req.body);
    } catch(e) {   
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res, next) => {
    if(!req.body.first_name || !req.body.last_name) return res.status(422).json('First name and last name fields cant be empty!');
    const data = `first_name = '${req.body.first_name}', last_name = '${req.body.last_name}'`;
    try {
        await db.update(req.params.id, data);    
        res.status(200).json('User succesfully updated');
    } catch(e) {   
        console.log(e);
        res.sendStatus(500);    
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await db.delete(req.params.id);    
        res.status(200).json('User succesfully deleted');
    } catch(e) {   
        console.log(e);
        res.sendStatus(500);    
    }
});

module.exports = router;        