const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/react')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const facilitySchema = new mongoose.Schema({
    schedule: {
        type:String,
    },
    equipment_inventory: {
        type:String,
    },
    facilities:{
        type:String,
    },
});

const Facility = mongoose.model('Facility', facilitySchema);

app.get('/', async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.json(facilities);
    } catch (err) {
        console.error('Error fetching facilities:', err);
        res.status(500).json({ error: "Error inside server" });
    }
});

app.post('/facility', async (req, res) => {
    const { schedule, equipment_inventory, facilities } = req.body;
    try {
        const newFacility = new Facility({ schedule, equipment_inventory, facilities });
        await newFacility.save();
        res.json(newFacility);
    } catch (err) {
        console.error('Error creating facility:', err);
        res.status(500).json({ error: "Error inside server" });
    }
});

app.get('/read/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const facility = await Facility.findById(id);
        res.json(facility);
    } catch (err) {
        console.error('Error fetching facility:', err);
        res.status(500).json({ error: "Error inside server" });
    }
});

app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { schedule, equipment_inventory, facilities } = req.body;
    try {
        const updatedFacility = await Facility.findByIdAndUpdate(id, { schedule, equipment_inventory, facilities }, { new: true });
        res.json(updatedFacility);
    } catch (err) {
        console.error('Error updating facility:', err);
        res.status(500).json({ error: "Error inside server" });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Facility.findByIdAndDelete(id);
        const facilities = await Facility.find()
        res.json({ message: "Facility deleted successfully" , facilities});
    } catch (err) {
        console.error('Error deleting facility:', err);
        res.status(500).json({ error: "Error inside server" });
    }
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
