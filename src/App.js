import React, { useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';

function App() {
  const [file, setFile] = useState('');
  const [excelData, setExcelData] = useState([]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    try {
      const data = await readFile(selectedFile);
      const parsedData = parseExcelData(data);
      setExcelData(parsedData);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Checks if the input file is empty or not 
    if (!file) {
      console.log("No File Selected");
      alert("No File Selected");
      return;
    }

    //Only accepts an excel file
    const fileType = file.type;
    if (fileType !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      console.log("Please select an Excel file.");
      alert("Please select an Excel file.");
      return;
    }

    try {
      await sendDataToServer(excelData);
      console.log('Uploading Data: Successful');
      
      const inputElement = document.querySelector('input[type="file"]');
      if (inputElement) {
        inputElement.value = ''; // Reset the value to empty string
      }
      // Clear the list
      setExcelData([]); // Reset excelData to an empty array
      alert("Data Upload Successfull.");

    } catch (error) {
      console.error('Error occurred while sending data:', error);
    }
  }

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(new Uint8Array(e.target.result));
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  const parseExcelData = (data) => {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Assuming there's only one sheet
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { header: 1 }).slice(1); // Exclude the first row (header)
  }

  const sendDataToServer = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ excelData: data }), // Send the Excel data as JSON
      });
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="border-holder">
        <div className="border">
          <div className="border-content">
            <h1>UPLOAD EXCEL FILE</h1>
            <div>
              <input
                type="file"
                name="thisEvent"
                className="thisfile"
                onChange={handleFileChange}
              />
            </div>
            <button className="btn" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <div className="border">
          <div className="border-content">
            {excelData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No File Selected</div>
            )}
          </div>
        </div>
    </div>
  );
}

export default App;


// import React, { useState } from 'react';
// import './App.css';
// import * as XLSX from 'xlsx';

// function App() {
//   const [file, setFile] = useState('');

//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     //Checks if the input file is empty or not 
//     if (!file) {
//       console.log("No File Selected");
//       return;
//     }

//     //Only accepts an excel file
//     const fileType = file.type;
//     if (fileType !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
//       console.log("Please select an Excel file.");
//       alert("Please select an Excel file.");
//       return;
//     }

//     try {
//       await sendDataToServer(file);
//       console.log('Uploading Data: Successful');
      
//       const inputElement = document.querySelector('input[type="file"]');
//       if (inputElement) {
//         inputElement.value = ''; // Reset the value to empty string
//       }
//       alert("Data Upload Successful.");

//     } catch (error) {
//       console.error('Error occurred while sending data:', error);
//     }
//   }

//   const sendDataToServer = async (file) => {
//     try {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0]; // Assuming there's only one sheet
//         const sheet = workbook.Sheets[sheetName];
//         const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 }).slice(1); // Exclude the first row (header)
//         console.log(excelData);
        
//         // Send the Excel data to server
//         const response = await fetch('http://localhost:5000/upload', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ excelData }), // Send the Excel data as JSON
//         });
//         if (!response.ok) {
//           throw new Error('Failed to send data');
//         }
//       };
//       reader.readAsArrayBuffer(file);
//     } catch (error) {
//       throw error;
//     }
//   }

//   return (
//     <div className="border">
//       <div className="border-content">
//         <h1>UPLOAD EXCEL FILE</h1>
//         <div>
//           <input
//             type="file"
//             name="thisEvent"
//             className="thisfile"
//             onChange={handleFileChange}
//           />
//         </div>
//         <button className="btn" onClick={handleSubmit}>Submit</button>
//       </div>
//     </div>
//   );
// }

// export default App;
