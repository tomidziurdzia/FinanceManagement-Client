import Categories from "../components/Categories";
import Chart from "../components/Chart";
import DashboardBalance from "../components/DashboardBalance";
import DashboardTransactions from "../components/DashboardTransactions";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        <div className="w-9/12">
          <DashboardBalance />
          <Chart />
        </div>
        <div className="w-3/12 ml-4">
          <Categories />
        </div>
      </div>
      <div>
        <DashboardTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
