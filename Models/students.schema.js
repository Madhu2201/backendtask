
import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    studentName:String,
    mentorName:String

})
const user1= mongoose.model("user1",userSchema)
export default user1;