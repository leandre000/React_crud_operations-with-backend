import  { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import axios from "axios";

function Read() {
    const { id } = useParams();
    const [facility, setFacility] = useState({ schedule: "", equipment_inventory: "", facilities: "" });

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

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2>Facility List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Schedule</th>
                            <th>Equipment</th>
                            <th>Facility</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{id}</td>
                            <td>{facility.schedule}</td>
                            <td>{facility.equipment_inventory}</td>
                            <td>{facility.facilities}</td>
                            <td>
                               
                                <Link to="/" className="btn btn-primary me-2">Back</Link>
                                <Link to={`/edit/${facility.id}`} className="btn btn-info">Edit</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Read;
