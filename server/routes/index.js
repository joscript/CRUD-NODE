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
    try {
        let results = await db.create(`'${req.body.first_name}', '${req.body.last_name}'`);    
        res.json(results);
    } catch(e) {   
        console.log(e);
        res.sendStatus(500);
    }
}); 

router.put('/:id', async (req, res, next) => {
    const data = `first_name = '${req.body.first_name}', last_name = '${req.body.last_name}'`;
    try {
        let results = await db.update(req.params.id, data);    
        res.json(results);
    } catch(e) {   
        console.log(e);
        res.sendStatus(500);    
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        let results = await db.delete(req.params.id);    
        res.json(results);
    } catch(e) {   
        console.log(e);
        res.sendStatus(500);    
    }
});

module.exports = router;        