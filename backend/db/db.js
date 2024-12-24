import mongoose from 'mongoose';

function connect() {
      return mongoose.connect(process.env.MONGO_URI)
      .then(()=>{
            console.log('Database connected');
      }).catch((error)=>{
            console.log('Error connecting to database',error.message);
      });
}
export default connect;