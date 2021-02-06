const express = require('express')
const admin = require('firebase-admin')
const cors = require('cors')
const path = require('path')

// const fsConfig = require('./server/tools/serviceAccount.json')
const register = require('./server/api/register')
const getEditInfo = require('./server/api/get-edit-info')
const allInfo = require('./server/api/all-info')
const fullInfo = require('./server/api/full-info')
const updateInfo = require('./server/api/update-info')

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FSCONFIG))
    // credential: admin.credential.cert(JSON.parse(process.env.FS_CONFIG))
})

const fs = admin.firestore()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000


app.use(express.static(__dirname + '/dist/log'))

app.use('/register', register)
app.use('/get-edit-info', getEditInfo)
app.use('/all-info', allInfo)
app.use('/full-info', fullInfo)
app.use('/edit-info', updateInfo)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/log/index.html'))
})

app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})

exports.fs = fs