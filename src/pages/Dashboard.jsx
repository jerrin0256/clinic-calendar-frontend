import React from "react";
import CalendarView from "../components/CalendarView";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Clinic Dashboard</h1>
      </header>

      <main style={styles.main}>
        <CalendarView />
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f2f6f9",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    padding: "20px",
    backgroundColor: "#787d7b67",
    color: "#fff",
    display: "flex",
    justifyContent: "center", 
    alignItems: "center",
  },
  main: {
    padding: "20px",
  },
};

export default Dashboard;

