const express = require('express')
const router = express.Router()
const indexPage = require('../../index')


router.get('/:id', async(req, res) => {
    const id = req.params.id
    const fb = indexPage.fs

    try {
        const info = (await fb.collection('log').doc(id).get()).data()

        if (info) {
            return res.status(200).json(info)
        }
        return res.status(400).json({message: 'User not Found'})

    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router