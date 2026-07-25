import { Link } from "react-router-dom";
import {
    FaHome,
    FaUsers,
    FaPlusCircle,
    FaTint,
    FaCheckCircle
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">

            <ul className="list-group list-group-flush">

                <li className="list-group-item">
                    <Link to="/">
                        <FaHome /> Dashboard
                    </Link>
                </li>

                <li className="list-group-item">
                    <Link to="/donors">
                        <FaUsers /> Donors
                    </Link>
                </li>

                <li className="list-group-item">
                    <Link to="/add-donor">
                        <FaPlusCircle /> Add Donor
                    </Link>
                </li>

                <li className="list-group-item">
                    <Link to="/history">
                        <FaTint /> Donation History
                    </Link>
                </li>

                <li className="list-group-item">
                    <Link to="/eligibility">
                        <FaCheckCircle /> Eligibility
                    </Link>
                </li>

            </ul>

        </aside>
    );
}

export default Sidebar;