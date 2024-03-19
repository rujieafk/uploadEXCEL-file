
// // server.js
// const dbOperation = require('./dbFiles/dbOperation');
// const Employee = require('./dbFiles/employee');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 5000; // You can change the port as needed

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // POST endpoint to handle Excel data upload
// app.post('/upload', async (req, res) => {
//   const { excelData } = req.body;
// //   console.log('Received Excel data:', excelData);

// //   // Process each row
// //   excelData.forEach(row => {
// //     const [name, department, salary] = row;
// //     console.log('Name:', name);
// //     console.log('Department:', department);
// //     console.log('Salary:', salary);

// //     // You can save this data to a database or perform any other necessary operations
// //     //Insert to Database
// //     let newEmp = new Employee(name, department, salary);
// //     dbOperation.insertEmployee(newEmp);

// //     //Display
// //     dbOperation.getEmployees()
// //     .then(res => {
// //         console.log(res.rowsAffected); 
// //     })
// //     .catch(error => {
// //         console.error("Error retrieving employees:", error); // Handling error
// //     });
// //   });

// // Process each row
// for (const row of excelData) {
//     const [name, department, salary] = row;

//     // console.log('Name:', name);
//     // console.log('Department:', department);
//     // console.log('Salary:', salary);

//     // Insert to Database
//     let newEmp = new Employee(name, department, salary);
    
//     try {
//       await dbOperation.insertEmployee(newEmp);
//       console.log('Employee inserted:', newEmp);
//     } catch (error) {
//       console.error("Error inserting employee:", error); // Handling error
//     }
//   }

// //   // Show total number of users
// //   try {
// //     const totalUsers = await dbOperation.getEmployees();
// //     console.log('Total number of users:', totalUsers);
// //   } catch (error) {
// //     console.error("Error getting total number of users:", error); // Handling error
// //   }

//   // Send response
//   res.status(200).send('Data received successfully');
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
    



// server.js
const dbOperation = require('./dbFiles/dbOperation');
const Employee = require('./dbFiles/employee');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000; // You can change the port as needed

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST endpoint to handle Excel data upload
app.post('/upload', async (req, res) => {
  const { excelData } = req.body;
//   console.log('Received Excel data:', excelData);

// Process each row
for (const row of excelData) {
    const [name, department, salary] = row;

    // Insert to Database
    let newEmp = new Employee(name, department, salary);
    
    try {
      await dbOperation.insertEmployee(newEmp);
      console.log('Employee inserted:', newEmp);
    } catch (error) {
      console.error("Error inserting employee:", error); // Handling error
    }
  }

  // Send response
  res.status(200).send('Data received successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
    

