const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
    userId:String,
    gmailId: String,
    threadId: String,
    sender: String,
    subject: String,
    body: String,
    snippet: String,
    receivedAt: Date
});

module.exports=mongoose.model("Email",EmailSchema);


