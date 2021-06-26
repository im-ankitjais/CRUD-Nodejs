var Userdb = require('../model/model');

exports.create = (req,res) => {
    console.log(req.body)
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        mobile : req.body.mobile,
        gender: req.body.gender,
        status : req.body.status
    }) 

    user.save(user)
        .then(data => {
            console.log("user added" + data)
            res.status(200).send({
                message : "User Added"
            });
        })
        .catch(err => {
            console.log("User Add Error")
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        })
}


exports.find = (req,res) => {
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })
    }
    else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

}


exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty."})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                console.log(data)
                res.status(200).send({message: `user updated`})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                console.log(data)
                res.status(200).send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: `Could not delete User with id= ${id}`
            });
        });
}