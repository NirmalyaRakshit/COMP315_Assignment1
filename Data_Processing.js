const fs = require('fs');
const path = require('path');

// Define the path to the CSV file
const csvFilePath = path.join(__dirname, 'Raw_User_Data.csv');

// Define an array to store the cleaned data
const cleanedData = [];

// Define a function to validate the data
function isValidData(data) {
  // Check if all required fields are present and valid
  if (!data.name || !data.age || !data.title || !data.dob || !data.email) {
    return false;
  }

  // Check if age is a number
  if (typeof data.age !== 'number') {
    return false;
  }

  // Check if dob is a valid date
  if (isNaN(Date.parse(data.dob))) {
    return false;
  }

  // Check if email is a valid email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return false;
  }

  return true;
}

// Define a function to process the data
function processData(data) {
  // Format the data
  const formattedData = {
    name: data.name,
    age: parseInt(data.age),
    title: data.title,
    dob: new Date(data.dob),
    email: data.email
  };

  // Clean the data
  if (isValidData(formattedData)) {
    cleanedData.push(formattedData);
  }
}

// Read the CSV file
fs.readFile(csvFilePath, 'utf-8', (err, data) => {
  if (err) {
    console.error(`Error reading CSV file: ${err}`);
    return;
  }

  // Split the CSV data into lines
  const lines = data.split('\n');

  // Process each line
  lines.forEach(line => {
    // Skip empty lines
    if (!line) {
      return;
    }

    // Split the line into fields
    const fields = line.split(',');

    // Process the fields
    processData(fields);
  });

  // Calculate the percentage of altered data
  const percentageAltered = parseFloat(((lines.length - cleanedData.length) / lines.length * 100).toFixed(3));

  // Log the results
  console.log('Most common surname:', mostCommonSurname(cleanedData));
  console.log('Average age:', averageAge(cleanedData));
  console.log('Youngest Dr:', youngestDr(cleanedData));
  console.log('Most common month of birth:', mostCommonMonth(cleanedData));
  console.log('Percentage of altered data:', percentageAltered);
});

// Define functions to calculate the statistics
function mostCommonSurname(data) {
  // TODO: Implement this function
}

function averageAge(data) {
  // TODO: Implement this function
}

function youngestDr(data) {
  // TODO: Implement this function
}

function mostCommonMonth(data) {
  // TODO: Implement this function
}