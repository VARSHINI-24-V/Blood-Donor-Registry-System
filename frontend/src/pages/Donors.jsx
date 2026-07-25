import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Donors.css";
function Donors() {
    const navigate = useNavigate();

    const [donors, setDonors] = useState([]);
    const [bloodGroup, setBloodGroup] = useState("");
    const [area, setArea] = useState("");

    const loadDonors = () => {
        api.get("/donors")
            .then((response) => {
                setDonors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        loadDonors();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await api.get(
                `/donors/search?blood_group=${bloodGroup}&area=${area}`
            );

            setDonors(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/donors/${id}`);

            setDonors((prevDonors) =>
                prevDonors.filter((donor) => donor.id !== id)
            );

            alert("Deleted Successfully");
        } catch (err) {
            console.log(err);
            alert("Error deleting donor");
        }
    };
return (
    <div className="container-fluid">

        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold text-danger">
                🩸 Donor Management
            </h1>
        </div>

        {/* Search Card */}

        <div className="card shadow-sm border-0 mb-4">

            <div className="card-body">

                <div className="row g-3">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Blood Group"
                            value={bloodGroup}
                            onChange={(e) =>
                                setBloodGroup(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Area"
                            value={area}
                            onChange={(e) =>
                                setArea(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-4">

                        <button
                            className="btn btn-danger me-2"
                            onClick={handleSearch}
                        >
                            🔍 Search
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={loadDonors}
                        >
                            Reset
                        </button>

                    </div>

                </div>

            </div>

        </div>

        {/* Table */}

        <div className="card shadow border-0">

            <div className="card-body">

                <table className="table table-hover table-striped align-middle">

                    <thead className="table-danger">

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Phone</th>

                            <th>Blood Group</th>

                            <th>Area</th>

                            <th>Gender</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {donors.map((donor) => (

                            <tr key={donor.id}>

                                <td>{donor.id}</td>

                                <td>{donor.name}</td>

                                <td>{donor.phone}</td>

                                <td>

                                    <span className="badge bg-danger">
                                        {donor.blood_group}
                                    </span>

                                </td>

                                <td>{donor.area}</td>

                                <td>{donor.gender}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            navigate(`/edit/${donor.id}`)
                                        }
                                    >
                                        ✏ Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(donor.id)
                                        }
                                    >
                                        🗑 Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    </div>
);
}

export default Donors;