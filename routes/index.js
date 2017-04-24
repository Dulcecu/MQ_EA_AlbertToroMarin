var express = require('express'),
    bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var users = new Schema({
    name: String,
    studies:[String],
    phone:[String],
    address:String,
    subjects:[{type:Schema.ObjectId,ref:'subjects'}]

});
var subjects=new Schema({
    name: String,
    users: [{type: Schema.ObjectId ,ref:'users'}]
});

mongoose.connect("mongodb://localhost:27017/minimo", function(err, users) {
    if(!err) {
        console.log("We are connected")
    }
});
var Usuario = mongoose.model('users', users);
var Subject = mongoose.model('subject',subjects);
var u;
var s;
app.use(express.static('public'));
app.use(bodyParser.json());
app.post('/pushsub', function (req, res) {

    s=new Subject({name:req.body.name});
    s.save().then(function(){});

    res.send('Got a POST request')
});

app.post('/push', function (req, res) {

        Usuario.findOne({name:req.body.name},function (err,response) {

            if (response != undefined) {
                u=response
                u.studies.push(req.body.study)
                u.phone.push(req.body.phonename+" : "+req.body.phone)
                u.save()
            }
            else {
                u = new Usuario({
                    name: req.body.name,
                    address: req.body.address,
                    studies: req.body.study,
                    phone:req.body.phonename+" : "+req.body.phone
                });
                u.save()
            }
            res.send('Got a POST request')
        })
});

app.put('/updsub', function (req, res) {

    Usuario.find({name:req.body.name},function (err,usuario) {
        u = usuario;

        if (u[0] != undefined) {
            Subject.update({name: req.body.subject}, {$push: {users: u[0]._id}}, function (err, upd) {

            })
        }
    })
        Subject.find({name:req.body.subject},function (err,subject) {
        s=subject
            if (s[0] != undefined) {
               Usuario.update({name: req.body.name}, {$push: {subjects: s[0]._id}}, function (err, upd) {

                })
            }


        })


    })

        //userList=usuarios.users;
        //Subject.findOneAndUpdate({name:"EA"},{users:userList}).then(function () {
    //})
app.post('/userdetail', function(req, res) {
    var students=[];
    var list=""
    Usuario.find({name:req.body.name}, function(err, user) {

        if(user[0]!=undefined){
            Subject.populate(user, {path: "subjects"},function(err, subjects) {

                var i = 0;
                for (; i < user[0].subjects.length; i++) {

                    list+=user[0].subjects[i].name+" "
                }
                students.push({name: user[0].name, address: user[0].address,phone:user[0].phone,studies:user[0].studies,subjects:list})
                res.send(students);
            });
        }
        else {
            res.send(students);
        }

    });
});

app.get('/all', function (req,res) {
    var users = [];
    Usuario.find({},null,{sort:{name:1}},function(err,usuarios){
        for (var i = 0; i < usuarios.length; i++) {
            users.push({name: usuarios[i].name, studies:usuarios[i].studies,phone:usuarios[i].phone,address:usuarios[i].address});
        }

        res.send(users);
    });
});
app.get('/allsubjects', function (req,res) {
    var subjects = [];
    Subject.find({},null,{sort:{name:1}},function(err,subj){
        for (var i = 0; i < subj.length; i++) {
            subjects.push({name:subj[i].name,l:subj[i].users.length});
        }
        subjects.sort(function(a, b){
            return b.l-a.l
        });
        res.send(subjects);
    });
});
app.get('/filterdb/:letter', function (req, res) {
    var users=[];
    var letter=req.params.letter;
    Usuario.find({"name":{"$regex": letter} },function (err, usuarios) {
        for (var i = 0; i < usuarios.length; i++) {
            users.push({name: usuarios[i].name, studies:usuarios[i].studies,phone:usuarios[i].phone,address:usuarios[i].address});
        }
        res.send(users);
    });
});
app.get('/filtersdb/:letter', function (req, res) {
    var users=[];
    var letter=req.params.letter;
    Usuario.find({"studies":{"$regex": letter} },function (err, usuarios) {
        for (var i = 0; i < usuarios.length; i++) {
            users.push({name: usuarios[i].name, studies:usuarios[i].studies,phone:usuarios[i].phone,address:usuarios[i].address});
        }
        res.send(users);
    });
});

app.listen(3500, function () {
    console.log('App listening on port 3500!!')
});

