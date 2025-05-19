import { FaUsers } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";

const DashboardBox = (props) => {
    return (
        <div className="dashboardBox">
            <div className="d-flex w-100">
                <div className="col1">
                    <h4 className="text-white"> Total Users </h4>
                    <span className="text-white">0</span>
                </div>
                <div className="mt-2">
                    {props.icon ? (
                        <span className="icon">{props.icon}</span>
                    ) : null}
                </div>
            </div>

            <div className="d-flex align-items-center">
                <h5 className="text-white mb-0 mt-0 ml-3">Last Month</h5>
            </div>
        </div>
    );
};

export default DashboardBox;
