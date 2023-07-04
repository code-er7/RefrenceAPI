import {app} from "./app.js";
import {connectDB} from "./data/database.js"

//imported database connection
connectDB();


app.listen(process.env.PORT, ()=>{
    console.log(`Server is listning on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})