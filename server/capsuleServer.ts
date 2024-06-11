import * as dotenv from 'dotenv';
import {App} from './capsuleApp';
import { connect } from 'mongoose'; // Corrected import for mongoose

dotenv.config();

const port = process.env.PORT || 3000;  // Default to 3000 if PORT is not set
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbInfo = process.env.DB_INFO;


const mongoDBConnection = `mongodb+srv://${dbUser}:${encodeURIComponent(dbPassword)}${dbInfo}`;

console.log("server db connection URL " + mongoDBConnection);

let server: any = new App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);

// connect(mongoDBConnection, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }).then(() => {
//     console.log('Connected to MongoDB');
//     let app = new App(mongoDBConnection).expressApp;
  
//     // Define a root route
//     app.get('/', (req, res) => {
//       res.send('Welcome to the Time Capsule app!');
//     });
  
//     // Listen on the specified port
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   }).catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit the process with error code
//   });