const express = require('express')
// const { protect } = require('../middleware/authMiddleware.js')
const router = express.Router()
const resumeModel = require('../models/resumeModel.js')

const pdf = require('html-pdf');
const pdfTemplate = require('../documents/index.js');

router.post("/saveResume",(req,res)=>{
    console.log("Body:",req.body)
    const data = req.body;
  
    const newblog = new resumeModel(data);
    res.send(newblog)

    newblog.save()
    
 
 
})

router.get("/getResume/:email",(req,res)=>{
    let email = req.params.email;
    resumeModel.find({email:email})
    .then((data)=>{
        console.log(data)
        res.json(data)

    })
    .catch((error)=>{
        console.log(error)
    })
})

router.get("/resumedata/:id",(req,res)=>{
    let id = req.params.id;

    resumeModel.find({_id:id})
    .then((data)=>{
        // console.log(data)
        res.json(data)

    })
    .catch((error)=>{
        console.log(error)
    })
})

router.delete("/deleteResume/:id",(req,res)=>{
    let id = req.params.id;
    resumeModel.deleteOne({_id:id},(err)=>{
        if(err) throw err
        res.send("Resume deleted")
    })
})

router.get("/resume_by_id", async(req, res) => {
    let rid = req.query.id

   
    try {
    const resume =await resumeModel.find({ _id: rid  })
        
        res.send(resume)
        // console.log(resume[0])
    } catch (error) {
        res.json({message:error})
    }
     
});

router.put("/updateResume/:rid",(req,res)=>{
    const  data= req.body;
    const id = req.params.rid
console.log("data",data.basicdetails[0].name)

    resumeModel.updateMany({_id:id},
        {$set : {
            "basicdetails.0.name" : data.basicdetails[0].name,
            "basicdetails.0.email" : data.basicdetails[0].email,
            "basicdetails.0.phone" : data.basicdetails[0].phone,
            "edudetails.0.college" : data.edudetails[0].college,
            "edudetails.0.year" : data.edudetails[0].year,
            "edudetails.0.qualification" : data.edudetails[0].qualification,
            "edudetails.0.description" : data.edudetails[0].description,
            "expdetails.0.inst" : data.expdetails[0].inst,
            "expdetails.0.position" : data.expdetails[0].position,
            "expdetails.0.duration" : data.expdetails[0].duration,
            "expdetails.0.desc" : data.expdetails[0].desc,
            "projdetails.0.title" : data.projdetails[0].title,
            "projdetails.0.link" : data.projdetails[0].link,
            "projdetails.0.projdesc" : data.projdetails[0].projdesc,
            "skilldetails.0.techSkills" : data.skilldetails[0].techSkills,
            "skilldetails.0.interSkills" : data.skilldetails[0].interSkills,
        }
    })
    .then((data)=>{
        // console.log(data)
        res.json(data)

    })
    .catch((error)=>{
        console.log(error)
    })
})
router.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('routes/result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

router.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

module.exports = router