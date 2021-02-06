const express = require('express')
const { inflateRaw } = require('zlib')
const router = express.Router()

const indexPage = require('../../index')

router.post('/', async (req, res) => {
    const fb = indexPage.fs
    const filterOption = req.body
    // console.log(filterOption)
    let infoArr = []
    let totalDataLength = 0;

    try {
        const fsInfo = await fb.collection('log').get()

        fsInfo.forEach(singleInfo => {
            singleInfo = singleInfo.data();
            const info = new Info(`${singleInfo.firstName} ${singleInfo.lastName}`, singleInfo.contactInfo.email, singleInfo.contactInfo.phone, singleInfo.uid)
            infoArr.push(info)
        })

        

        if (filterOption.search) {
            const s = filterOption.search
            infoArr = infoArr.filter(info => {
                if (info.fullName.includes(s) ||
                    info.email.includes(s) ||
                    info.phone.includes(s)
                    ) {
                    return true
                }
                return false;
            })
        }
        totalDataLength = infoArr.length
        // console.log(infoArr[0].fullName, infoArr[1].fullName)

        // sorting
        if (filterOption.sortBy && filterOption.sortDirection) {
            if (filterOption.sortDirection === 'desc') {
                infoArr.sort((a, b) => a[filterOption.sortBy] < b[filterOption.sortBy] ? 1 : -1)

            } else {
                infoArr.sort((a, b) => a[filterOption.sortBy] > b[filterOption.sortBy] ? 1 : -1)
            }
            // console.log(x)
        }

        infoArr = infoArr.splice((filterOption.pageNumber * filterOption.pageSize), filterOption.pageSize)
        // console.log('returning data', infoArr)
        return res.status(200).json({length: totalDataLength, log: infoArr})


    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
})

class Info {
    constructor(fullName, email, phone, uid) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.uid = uid;
    }
}

module.exports = router