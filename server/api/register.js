const express = require('express')
const fs = require('../../index')

const router = express.Router()

// const fb = indexPage.fs

router.post('/', async (req, res) => {
    const info = req.body

    const uid = fs.fs.collection('log').doc().id
    info.uid = uid

    try {
        await fs.fs.collection('log').doc(uid).set(info)
        res.status(201).json({message: 'Successfully Registered User'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router