import {app} from "./app.js";
import {connectDB} from "./data/database.js"

//imported database connection
connectDB();


app.listen(process.env.PORT, ()=>{
    console.log("server is listning on port 4000");
})