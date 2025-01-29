import {app} from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/index.js'

dotenv.config({
    path: "./.env", 
  });

connectDB().then(() => {
      app.on("error", (error)=> {
        console.error("Error: ", error);
      });

      // start the server 
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
      });
}).catch((err)=> {
    console.log(`MongoDB connection failed: ${err}`);
})

