import { useState, useEffect } from "react";
import { api, myToast } from "../../components/utils";
import { Heading } from "../../components/common";
import PatientChartByMonth from "./components/PatientChartByMonth";

const DashboardCard = ({ title, number }) => {
  return (
    <div className="border border-grey rounded-xl p-4 flex flex-col items-center min-w-48 bg-white">
      <Heading level={6}>{title}</Heading>
      <Heading level={2}>{number}</Heading>
    </div>
  );
};

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({});

  const getDashboard = async () => {
    try {
      const {
        data: { result },
      } = await api.get("/dashboard");
      setDashboard(result);
    } catch (err) {
      myToast(err.response.data.error, "failure");
    }
  };
  useEffect(() => {
    getDashboard();
  }, []);
  return (
    <div>
      <Heading level={2} className="mb-4">
        Dashboard
      </Heading>
      {Object.keys(dashboard).length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex gap-4 flex-wrap">
            <DashboardCard
              title="Total Patients"
              number={dashboard.totalPatients}
            />
            <DashboardCard
              title="Total Prescriptions"
              number={dashboard.totalPrescriptions}
            />
            <DashboardCard
              title="Avg. Prescriptions per Patient"
              number={
                dashboard.totalPrescriptions === 0
                  ? "0"
                  : (
                      dashboard.totalPatients / dashboard.totalPrescriptions
                    ).toFixed(2)
              }
            />
          </div>
          <div className="min-h-72 mt-8">
            <PatientChartByMonth
              data={dashboard.patientsByMonthCount}
              statuses={dashboard.statuses}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
