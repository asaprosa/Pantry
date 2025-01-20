const axios = require('axios');

const dummyData = {
  name: "John Doe",
  age: 30,
  weight: 75.5,
  height: 180,
  gender: "male",
  chronicDiseases: "None",
  allergies: "Peanuts"
};

async function testProfileAPI() {
  try {
    const response = await axios.post('http://localhost:3000/api/profile', dummyData);
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testProfileAPI();