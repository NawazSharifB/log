const express = require('express')
const router = express.Router()

const indexPage = require('../../index')

router.post('/', async (req, res) => {
    const info = req.body
    const fb = indexPage.fs


    delete info.contactInfo

    // console.log(info)

    try {
        await fb.collection('log').doc(info.uid).update(info)

        return res.status(200).json({message: 'SuccessFul'})
    } catch(error) {
        console.log(error)
        return res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router