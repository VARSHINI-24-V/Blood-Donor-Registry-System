import { useState } from "react";
import api from "../services/api";
import { FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
function AddDonor() {

    const [form, setForm] = useState({
        name: "",
        phone: "",
        blood_group: "",
        area: "",
        gender: "",
        dob: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await api.post("/donors", form);

           Swal.fire({
    title: "Success!",
    text: "Donor added successfully.",
    icon: "success",
    confirmButtonColor: "#dc3545"
});

            setForm({
                name: "",
                phone: "",
                blood_group: "",
                area: "",
                gender: "",
                dob: ""
            });

        } catch (err) {

            console.log(err);
           Swal.fire({
    title: "Error!",
    text: err.response?.data?.detail || "Unable to add donor.",
    icon: "error",
    confirmButtonColor: "#dc3545"
});

        }
    };

    return (

       <div className="container-fluid mt-4">

    <div className="row justify-content-center">

     <div className="col-lg-10 col-md-11">

                    <div className="card shadow-lg border-0 rounded-4">

                        <div className="card-header bg-danger text-white">

                            <h3 className="mb-0">

                                <FaUserPlus className="me-2"/>

                                Add New Donor

                            </h3>

                        </div>

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Blood Group
                                        </label>

                                        <select
                                            className="form-select"
                                            name="blood_group"
                                            value={form.blood_group}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select
                                            </option>

                                            <option>A+</option>
                                            <option>A-</option>
                                            <option>B+</option>
                                            <option>B-</option>
                                            <option>AB+</option>
                                            <option>AB-</option>
                                            <option>O+</option>
                                            <option>O-</option>

                                        </select>

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Gender
                                        </label>

                                        <select
                                            className="form-select"
                                            name="gender"
                                            value={form.gender}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select
                                            </option>

                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>

                                        </select>

                                    </div>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Area
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="area"
                                        value={form.area}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Date of Birth
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        name="dob"
                                        value={form.dob}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-danger w-100"
                                >
                                    ➕ Add Donor
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddDonor;