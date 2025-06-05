import { User } from "./models/users.model";

const testCase = async()=>{
    await User.create({
        fullname:"Sangam Silwal",
        username:"sandysangam",
        email:"sangam@gmail.com",
        password:"admin",
    })
}

export default testCase