// controllers/cityController.js
const City = require('../models/City');

// Add City
exports.addCity = async (req, res) => {
    try {
        const city = new City(req.body);
        await city.save();
        res.status(201).json({ message: 'City added successfully', city: city });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Update City
exports.updateCity = async (req, res) => {
    try {
        const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.json({ message: 'City updated successfully', city });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete City
exports.deleteCity = async (req, res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.json({ message: 'City deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.json(cities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get Cities with qury parameter
//http://localhost:3000/cities?page=1&limit=10&filter={"country":"USA"}&sort={"population":"desc"}&search=New York&projection=name,country,population
exports.getCities = async (req, res) => {
    try {
        const { page = 1, limit = 10, filter = '{}', sort = '{}', search = '', projection = '' } = req.query;

        const filterObj = JSON.parse(filter);
        const sortObj = JSON.parse(sort);
        const projectionObj = projection.split(',').reduce((acc, field) => {
            acc[field.trim()] = 1;
            return acc;
        }, {});

        if (search) {
            filterObj.name = { $regex: search, $options: 'i' };
        }

        const cities = await City.find(filterObj)
            .sort(sortObj)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .select(projectionObj);

        res.json(cities);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
