const app = require('express')()

app.get('/',(req,res,next)=>{
        res.status(200).send("Hello Backend with Browser-Sync")

})

app.listen(8080,()=>{
    console.log('Backend running on 8080')
})