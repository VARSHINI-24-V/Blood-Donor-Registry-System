import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import api from "../services/api";

function Eligibility() {

    const [donors, setDonors] = useState([]);
    const [donorId, setDonorId] = useState("");
    const [result, setResult] = useState(null);

    useEffect(() => {

        api.get("/donors")
            .then((res) => {
                setDonors(res.data);
            })
            .catch(console.log);

    }, []);

    const checkEligibility = async () => {

        if (!donorId) {
            alert("Please select a donor");
            return;
        }

        try {

            const res = await api.get(`/donations/${donorId}/eligibility`);

            setResult(res.data);

        } catch (err) {

            console.log(err);

            alert("Unable to fetch eligibility");

        }

    };

    return (

       <div className="container-fluid mt-4">

            <div className="row justify-content-center">

              <div className="col-lg-10 col-md-11">

                    <div className="card shadow-lg border-0 rounded-4">

                        <div className="card-header bg-danger text-white">

                            <h3 className="mb-0">
                                🩸 Donor Eligibility Check
                            </h3>

                        </div>

                        <div className="card-body">

                            <div className="mb-3">

                                <label className="form-label">
                                    Select Donor
                                </label>

                                <select
                                    className="form-select"
                                    value={donorId}
                                    onChange={(e) => setDonorId(e.target.value)}
                                >

                                    <option value="">
                                        Select Donor
                                    </option>

                                    {donors.map((donor) => (

                                        <option
                                            key={donor.id}
                                            value={donor.id}
                                        >
                                            {donor.name}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            <button
                                className="btn btn-danger w-100 mb-4"
                                onClick={checkEligibility}
                            >
                                Check Eligibility
                            </button>

                            {result && (

                                <div
                                    className={`alert ${
                                        result.eligible
                                            ? "alert-success"
                                            : "alert-warning"
                                    }`}
                                >

                                    <h5 className="mb-3">

                                        {result.eligible ? (

                                            <>
                                                <FaCheckCircle className="me-2" />
                                                Eligible to Donate
                                            </>

                                        ) : (

                                            <>
                                                <FaTimesCircle className="me-2" />
                                                Not Eligible Yet
                                            </>

                                        )}

                                    </h5>

                                   <p>
    <strong>Last Donation:</strong>{" "}
    {result.last_donation ?? "No donation yet"}
</p>

                                  <p>
    <strong>Days Since Last Donation:</strong>{" "}
    {result.days_since_last_donation ?? "N/A"}
</p>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Eligibility;