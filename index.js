import express from "express";
import data from "./data/mock.json" assert {type: "json"};

const app = express();

const PORT = 3000;

//Using public folder at project root

app.use(express.static('public'));

//Using the images folder at the route images
app.use('/img', express.static('img'))

//Using express.json and express.urlencoded
//app.use(express.json());
app.use(express.urlencoded({extended:true}))


//GET
app.get('/', (request, response)=>{
     response.json(data);
});

//POST- express.json and express.urlencoded
app.post('/item',(request, response)=>{
    console.log(request.body);
    response.send(request.body);
})

//GET - download method
app.get("/download", (request,response)=>{
    response.download("img/photoB.png");
})

//GET - redirect method
app.get('/redirect', (request, response) => {
    response.redirect('http://www.linkedin.com');
})

//Route chaining
app
    .route('/class')
    .get((request, response)=>{
        //response.send("Retrive class Info")
        throw new Error();
    })
    .post((request, response)=>{
        response.send("Create class info.")
    })
    .put((request, response)=>{
        response.send("Update class info.")
    });


//GET
// app.get('/class', (request, response)=>{
//     response.send("Retrive class Info")
// })

//POST
// app.post('/class',(request, response)=>{
//     response.send("Create class info.")
// })

//PUT
// app.put('/class',(request, response)=>{
//     response.send("Update class info.")
// })

//GET with next()
app.get('/next',(request,response, next)=>{
    console.log("The response will be send by the next function.");
    next();
}, (request,response)=>{
    response.send(" I just setup a route with a second call back")
})

//GET with Routing parameters 
app.get('/class/:id', (request, response)=>{
    const studentId = Number(request.params.id);

    const student = data.filter((student)=>student.id ===studentId)
    response.send(student);
})

//POST
app.post("/create", (request, response)=>{
    response.send('This is a POST request at /create');
})

//PUT
app.put('/edit', (request, response)=>{
    response.send('This is a PUT request at /edit ');
});

//DELETE
app.delete('/delete', (request, response)=>{
    response.send('This is a DELETE request at /delete');
} );

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send('Something is broken!');
})

app.listen(PORT, ()=> {
    console.log(`The server is running on port ${PORT}`);
});