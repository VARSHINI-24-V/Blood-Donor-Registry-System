import { useEffect, useState } from "react";
import api from "../services/api";
import {
    FaUsers,
    FaTint,
    FaHeartbeat
} from "react-icons/fa";

function Dashboard() {

    const [stats, setStats] = useState({
        total_donors: 0,
        total_donations: 0
    });

    useEffect(() => {
        api.get("/donors/dashboard")
            .then((response) => {
                setStats(response.data);
            })
            .catch(console.log);
    }, []);

    return (
        <div className="container-fluid">

            <h2 className="text-danger fw-bold mb-4">
                📊 Dashboard
            </h2>

            <div className="row g-4">

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body text-center">

                            <FaUsers
                                size={45}
                                className="text-primary mb-3"
                            />

                            <h5>Total Donors</h5>

                            <h2 className="fw-bold">
                                {stats.total_donors}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body text-center">

                            <FaTint
                                size={45}
                                className="text-danger mb-3"
                            />

                            <h5>Total Donations</h5>

                            <h2 className="fw-bold">
                                {stats.total_donations}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body text-center">

                            <FaHeartbeat
                                size={45}
                                className="text-success mb-3"
                            />

                            <h5>Life Saved ❤️</h5>

                            <h2 className="fw-bold">
                                {stats.total_donations * 3}
                            </h2>

                            <small className="text-muted">
                                Approximation
                            </small>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card shadow border-0 rounded-4 mt-5">

                <div className="card-body">

                    <h4 className="text-danger mb-3">
                        Welcome 👋
                    </h4>

                    <p className="text-muted">

                        This Blood Donor Registry System helps manage
                        donors, donation history, eligibility checking,
                        and donor search efficiently.

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;