const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cityController = require('./controllers/cityController');

const app = express();
app.use(bodyParser.json());

const dbURI ="mongodb+srv://cwpalade97:chetancity@cluster0.tasa9.mongodb.net/citiesdb?retryWrites=true&w=majority&appName=Cluster0"
require("dotenv").config();


mongoose.connect(dbURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
 .then(() => console.log("Mongo connected"))
 .catch(err => console.error("MongoDb Connection error:", err));

 //Routes

app.post('/cities',cityController.addCity);
app.put('/cities/:id',cityController.updateCity);
app.delete('/cities/:id',cityController.deleteCity);
app.get('/cities',cityController.getCities);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});