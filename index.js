const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

const users = [
    { id: 1, name: 'rashed',  email: 'rashed.com' },
    { id: 2, name: 'mostaf',  email: 'mostaf.com' },
    { id: 3, name: 'moon',  email: 'moon.com' },
    { id: 4, name: 'gosto',  email: 'gosto.com' }
]

app.get('/', (req, res) => {
    res.send('Hi there, your server is ready')
})

//GET data from server

app.get('/users', (req, res) => {
    if(req.query.name){
        const search = req.query.name.toLowerCase()
        const matched = users.filter(user=>user.name.toLowerCase().includes(search))
        res.send(matched)
    }
    else{
        res.send(users)
    }
})
app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    res.send(user)
})

//POST data from client

app.post('/user',(req,res)=>{
    const user = req.body
    user.id = users.length + 1
    console.log(user)
    users.push(user)
    res.send(user)
})

app.listen(port, () => {
    console.log('Listening to port', port)
})