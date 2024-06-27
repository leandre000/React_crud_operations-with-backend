

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; 
// import axios from "axios";

// function Home() {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:8081/')
//             .then(res => setData(res.data))
//             .catch(err => console.log(err));
//     }, []);

//     const calculateDaysRemaining = (endDate) => {
//         const oneDay = 24 * 60 * 60 * 1000; 
//         const today = new Date();
//         const end = new Date(endDate);
//         const diffDays = Math.round(Math.abs((today - end) / oneDay));
//         return diffDays;
//     };

//     const handleDelete = (id) => {
//         axios.delete(`http://localhost:8081/delete/${id}`)
//             .then(res => {
//                 setData(data.filter(facility => facility._id !== id));
//                 console.log(res);
//             })
//             .catch(err => console.log(err));
//     };
    

//     return (
//         <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//             <div className="w-75 bg-white rounded p-3">
//                 <h2>Facility List</h2>
//                 <div className="d-flex justify-content-end mb-3">
//                     <Link to="/create" className="btn btn-success">Create +</Link>
//                 </div>
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>Id</th>
//                             <th>Schedule</th>
//                             <th>Equipment</th>
//                             <th>Facility</th>
//                             <th>Days in stock</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data && data.map((facility, index) => (
//                             <tr key={index}>
//                                 <td>{facility._id}</td>
//                                 <td>{facility.schedule}</td>
//                                 <td>{facility.equipment_inventory}</td>
//                                 <td>{facility.facilities}</td>
//                                 <td>{calculateDaysRemaining(facility.schedule)}</td>
//                                 <td>
//                                     <Link to={`/read/${facility._id}`} className="btn btn-sm btn-info">Read</Link>
//                                     <Link to={`/edit/${facility._id}`} className="btn btn-sm btn-primary mx-2">Edit</Link>
//                                     <button 
//                                         onClick={() => handleDelete(facility._id)} 
//                                         className="btn btn-sm btn-danger"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default Home;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const calculateDaysRemaining = (endDate) => {
        const oneDay = 24 * 60 * 60 * 1000; 
        const today = new Date();
        const end = new Date(endDate);
        const diffDays = Math.round(Math.abs((today - end) / oneDay));
        return diffDays;
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/delete/${id}`)
            .then(res => {
                setData(data.filter(facility => facility._id !== id));
                console.log(res);
            })
            .catch(err => console.log(err));
    };
    

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-75 bg-white rounded p-3">
                <h2>Facility List</h2>
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/create" className="btn btn-success">Create +</Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Schedule</th>
                            <th>Equipment</th>
                            <th>Facility</th>
                            <th>Days in stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((facility, index) => (
                            <tr key={index}>
                                <td>{facility._id}</td>
                                <td>{facility.schedule}</td>
                                <td>{facility.equipment_inventory}</td>
                                <td>{facility.facilities}</td>
                                <td>{calculateDaysRemaining(facility.schedule)}</td>
                                <td>
                                    <Link to={`/read/${facility._id}`} className="btn btn-sm btn-info">Read</Link>
                                    <Link to={`/edit/${facility._id}`} className="btn btn-sm btn-primary mx-2">Edit</Link>
                                    <button 
                                        onClick={() => handleDelete(facility._id)} 
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
