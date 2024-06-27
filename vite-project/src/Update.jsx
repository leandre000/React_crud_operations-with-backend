import  { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Update() {
    const  {id}  = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [facility, setFacility] = useState({
        schedule: "",
        equipment_inventory: "",
        facilities: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                console.log(res.data);
                setFacility({
                    schedule: res.data.schedule,
                    equipment_inventory: res.data.equipment_inventory,
                    facilities: res.data.facilities
                });
            })
            .catch(err => console.log(err));
    }, [id]); 

    console.log(facility);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`, facility)
        .then(res =>{
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFacility(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form>
                    <h2>Update Facility</h2>
                    <div className="mb-2">
                        <label htmlFor="">Schedules</label>
                        <input
                            type="date"
                            className="form-control"
                            name="schedule"
                            value={facility.schedule}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Equipments</label>
                        <input
                            type="text"
                            placeholder="Enter equipment"
                            className="form-control"
                            name="equipment_inventory"
                            value={facility.equipment_inventory}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Facility</label>
                        <input
                            type="text"
                            placeholder="Enter facility"
                            className="form-control"
                            name="facilities"
                            value={facility.facilities}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn btn-success" onClick={handleUpdate}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Update;
