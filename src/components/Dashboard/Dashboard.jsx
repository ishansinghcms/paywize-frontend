import BarChart from "../BarChart/BarChart";
import classes from "./style.module.css";

export default function Dashboard() {
  return (
    <div className={classes.container}>
      <div className={classes.dashboard_container}>
        <div className={classes.box}>
          <h3>Your website interactions</h3>
          <BarChart />
        </div>
        <div className={classes.box}>
          <h3>Global website interactions</h3>
          <BarChart />
        </div>
        <div className={classes.box}>
          <h3>Your question count</h3>
          <p>20</p>
        </div>
        <div className={classes.box}>
          <h3>Total question count from all users</h3>
          <p>143</p>
        </div>
      </div>
    </div>
  );
}
