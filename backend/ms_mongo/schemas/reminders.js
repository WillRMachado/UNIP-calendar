var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var remindersSchema = new Schema({
   dayName:String,
   reminders:[String],
});
module.exports = mongoose.model('reminders', remindersSchema);  