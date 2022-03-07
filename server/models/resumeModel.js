const mongoose = require('mongoose')

const resumeSchema = mongoose.Schema({
  
   email:String,
   basicdetails:Array,
   edudetails:Array,
   edudetailsArr:Array,
   expdetails:Array,
   expdetailsArr:Array,
   projdetails:Array,
   skilldetails:Array,

},{timestamps:true})

const resumeNodel = mongoose.model('resume',resumeSchema)

module.exports = resumeNodel;