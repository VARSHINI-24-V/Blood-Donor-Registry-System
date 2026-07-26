import { useEffect, useState } from "react";
import api from "../services/api";
import {
    FaUsers,
    FaTint,
    FaHeartbeat
} from "react-icons/fa";
import "./Dashboard.css";

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

            {/* Heading */}

            <h2 className="text-danger fw-bold mb-4">
                📊 Dashboard
            </h2>

            {/* Statistics Cards */}

            <div className="row g-4 mb-5">

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4 dashboard-card">

                        <div className="card-body text-center py-4">

                            <FaUsers
                                size={55}
                                className="text-primary mb-3"
                            />

                            <h5>Total Donors</h5>

                            <h1 className="display-4 fw-bold">
                                {stats.total_donors}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4 dashboard-card">

                        <div className="card-body text-center py-4">

                            <FaTint
                                size={55}
                                className="text-danger mb-3"
                            />

                            <h5>Total Donations</h5>

                            <h1 className="display-4 fw-bold">
                                {stats.total_donations}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4 dashboard-card">

                        <div className="card-body text-center py-4">

                            <FaHeartbeat
                                size={55}
                                className="text-success mb-3"
                            />

                            <h5>Lives Saved ❤️</h5>

                            <h1 className="display-4 fw-bold">
                                {stats.total_donations * 3}
                            </h1>

                            <small className="text-muted">
                                Approximation
                            </small>

                        </div>

                    </div>

                </div>

            </div>

            {/* Welcome Card */}

            <div className="card shadow border-0 rounded-4 dashboard-card mt-5">

                <div className="card-body p-4">

                    <h3 className="text-danger fw-bold">
                        🩸 Welcome to Blood Donor Registry System
                    </h3>

                    <p className="lead text-muted mt-3">
                        Manage donors, track donation history, check donor
                        eligibility, and search blood donors quickly through
                        one centralized dashboard.
                    </p>

                    <hr />

                    <div className="row text-center mt-4">

                        <div className="col-md-4">

                            <h4>👥 Donors</h4>

                            <p className="text-muted mb-0">
                                Register and manage donors.
                            </p>

                        </div>

                        <div className="col-md-4">

                            <h4>🩸 Donations</h4>

                            <p className="text-muted mb-0">
                                Maintain donation records.
                            </p>

                        </div>

                        <div className="col-md-4">

                            <h4>❤️ Eligibility</h4>

                            <p className="text-muted mb-0">
                                Check donor eligibility instantly.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;