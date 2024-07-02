import BarChart from "../BarChart/BarChart";
import classes from "./style.module.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";

export default function Dashboard() {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchDashboardData() {
      const email = localStorage.getItem("user");
      const response = await fetch(`${BASE_URL}/dashboard/analytics/${email}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    }
    fetchDashboardData();
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.dashboard_container}>
        <div className={classes.box}>
          <h3>Your website interactions</h3>
          <BarChart specific="user" />
        </div>
        <div className={classes.box}>
          <h3>Global website interactions</h3>
          <BarChart specific="all" />
        </div>
        <div className={classes.box}>
          <h3>Your question count</h3>
          <p>{data.userQuestionCount}</p>
        </div>
        <div className={classes.box}>
          <h3>Total question count from all users</h3>
          <p>{data.allUserQuestionCount}</p>
        </div>
      </div>
    </div>
  );
}
