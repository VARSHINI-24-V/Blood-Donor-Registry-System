import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";
import "./Donors.css";
function Donors() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [donors, setDonors] = useState([]);
    const [bloodGroup, setBloodGroup] = useState("");
    const [area, setArea] = useState("");

   const loadDonors = async () => {

    setLoading(true);

    try {

        const response = await api.get("/donors");
        setDonors(response.data);

    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);

    }
};

    useEffect(() => {
        loadDonors();
    }, []);

   const handleSearch = async () => {

    setLoading(true);

    try {

       const response = await api.get("/donors/search", {
    params: {
        blood_group: bloodGroup,
        area: area
    }
});

        setDonors(response.data);

    } catch (err) {

        console.log(err);

    } finally {

        setLoading(false);

    }
};
 const handleDelete = async (id) => {

    const result = await Swal.fire({
        title: "Delete Donor?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    try {

        await api.delete(`/donors/${id}`);

        setDonors((prevDonors) =>
            prevDonors.filter((donor) => donor.id !== id)
        );

        Swal.fire({
            title: "Deleted!",
            text: "Donor deleted successfully.",
            icon: "success",
            confirmButtonColor: "#dc3545"
        });

    } catch (err) {

        console.log(err);

        Swal.fire({
            title: "Error!",
            text: "Unable to delete donor.",
            icon: "error",
            confirmButtonColor: "#dc3545"
        });

    }
};
const getBadgeColor = (bloodGroup) => {
    switch (bloodGroup) {
        case "A+":
            return "bg-danger";
        case "A-":
            return "bg-dark";
        case "B+":
            return "bg-primary";
        case "B-":
            return "bg-info";
        case "AB+":
            return "bg-success";
        case "AB-":
            return "bg-secondary";
        case "O+":
            return "bg-warning text-dark";
        case "O-":
            return "bg-black";
        default:
            return "bg-light text-dark";
    }
};
const uniqueAreas = [...new Set(donors.map((donor) => donor.area))];
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
<select
    className="form-select"
    value={bloodGroup}
    onChange={(e) => setBloodGroup(e.target.value)}
>

    <option value="">All Blood Groups</option>

   <option value="A+">🩸 A+</option>
<option value="A-">🩸 A-</option>
<option value="B+">🩸 B+</option>
<option value="B-">🩸 B-</option>
<option value="AB+">🩸 AB+</option>
<option value="AB-">🩸 AB-</option>
<option value="O+">🩸 O+</option>
<option value="O-">🩸 O-</option>

</select>

                    </div>

                    <div className="col-md-4">
<select
    className="form-select"
    value={area}
    onChange={(e) => setArea(e.target.value)}
>

    <option value="">All Areas</option>

    {uniqueAreas.map((place) => (
        <option key={place} value={place}>
            {place}
        </option>
    ))}

</select>

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
    onClick={() => {
        setBloodGroup("");
        setArea("");
        loadDonors();
    }}
>
    Reset
</button>

                    </div>

                </div>

            </div>

        </div>
<div className="d-flex justify-content-between align-items-center mb-3">
    <h5 className="mb-0">
        Total Donors
        <span className="badge bg-danger ms-2">
            {donors.length}
        </span>
    </h5>
</div>
        {/* Table */}
<div className="card shadow border-0">

    <div className="card-body">

        {loading ? (

            <div className="text-center py-5">

                <div
                    className="spinner-border text-danger"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="mt-3 fw-semibold">
                    Loading donors...
                </p>

            </div>

        ) : (

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

                    {donors.length > 0 ? (

                        donors.map((donor) => (

                            <tr key={donor.id}>

                                <td>{donor.id}</td>
                                <td>{donor.name}</td>
                                <td>{donor.phone}</td>

                               <td>
    <span className={`badge ${getBadgeColor(donor.blood_group)}`}>
        {donor.blood_group}
    </span>
</td>

                                <td>{donor.area}</td>
                                <td>{donor.gender}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => navigate(`/edit/${donor.id}`)}
                                    >
                                        ✏ Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(donor.id)}
                                    >
                                        🗑 Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="7" className="text-center py-5">

                                <h4>🩸 No Donors Found</h4>

                                <p className="text-muted mb-0">
                                    Try another search or add a new donor.
                                </p>

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        )}

    </div>

</div>

    </div>
);
}

export default Donors;