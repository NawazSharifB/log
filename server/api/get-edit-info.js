const express = require('express')
const router = express.Router()
const indexPage = require('../../index')


router.post('/', async (req, res) => {
    
    const uid = req.body.uid
    const fb = indexPage.fs

    try {
        const info = (await fb.collection('log').doc(uid).get()).data()

        if (info) {
            return res.status(200).json(info)
        } else {
            return res.status(404).json({message: 'No User Found'})
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router