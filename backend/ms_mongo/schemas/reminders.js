var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var remindersSchema = new Schema({
   dayNumber:Number,
   monthNumber:Number,
   yearNumber:Number,
   reminderText:String,
});
module.exports = mongoose.model('reminders', remindersSchema);  