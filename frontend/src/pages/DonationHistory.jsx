import { useEffect, useState } from "react";
import api from "../services/api";
import { FaTint } from "react-icons/fa";

function DonationHistory() {

    const [donors, setDonors] = useState([]);
    const [donorId, setDonorId] = useState("");
    const [donationDate, setDonationDate] = useState("");
    const [remarks, setRemarks] = useState("");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        api.get("/donors")
            .then((res) => {
                setDonors(res.data);
            })
            .catch(console.log);
    }, []);

    const loadHistory = async () => {

        if (!donorId) {
            alert("Select a donor");
            return;
        }

        try {

            const res = await api.get(`/donations/${donorId}`);

            setHistory(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/donations", {
                donor_id: Number(donorId),
                donation_date: donationDate,
                remarks: remarks
            });

            alert("Donation Added Successfully");

            setDonationDate("");
            setRemarks("");

            loadHistory();

        } catch (err) {

            console.log(err);

            alert("Error Adding Donation");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow-lg border-0 rounded-4">

                <div className="card-header bg-danger text-white">

                    <h3>

                        <FaTint className="me-2"/>

                        Donation History

                    </h3>

                </div>

                <div className="card-body">

                    <div className="row mb-4">

                        <div className="col-md-8">

                            <select
                                className="form-select"
                                value={donorId}
                                onChange={(e)=>setDonorId(e.target.value)}
                            >

                                <option value="">
                                    Select Donor
                                </option>

                                {donors.map((donor)=>(

                                    <option
                                        key={donor.id}
                                        value={donor.id}
                                    >
                                        {donor.name}
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="col-md-4">

                            <button
                                className="btn btn-primary w-100"
                                onClick={loadHistory}
                            >
                                View History
                            </button>

                        </div>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6">

                                <label className="form-label">
                                    Donation Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={donationDate}
                                    onChange={(e)=>setDonationDate(e.target.value)}
                                    required
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">
                                    Remarks
                                </label>

                                <input
                                    className="form-control"
                                    placeholder="Remarks"
                                    value={remarks}
                                    onChange={(e)=>setRemarks(e.target.value)}
                                    required
                                />

                            </div>

                        </div>

                        <button
                            className="btn btn-danger mt-4"
                        >
                            Add Donation
                        </button>

                    </form>

                    <hr />

                    <h4 className="mb-3">
                        Donation Records
                    </h4>

                    <table className="table table-hover table-striped">

                        <thead className="table-danger">

                            <tr>

                                <th>ID</th>

                                <th>Date</th>

                                <th>Remarks</th>

                            </tr>

                        </thead>

                        <tbody>

                            {history.map((item)=>(

                                <tr key={item.id}>

                                    <td>{item.id}</td>

                                    <td>{item.donation_date}</td>

                                    <td>{item.remarks}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default DonationHistory;