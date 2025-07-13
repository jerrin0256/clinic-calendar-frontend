
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getAppointments } from "../utils/storage";
import AppointmentForm from "./AppointmentForm";
import { doctors, patients } from "../data/doctorsPatients";
import "./CalendarView.css";

const isMobile = window.innerWidth <= 768;

const CalendarView = () => {
  const [value, setValue] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterPatient, setFilterPatient] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const data = getAppointments();
    setAppointments(data);
  }, []);

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const filteredAppointments = appointments.filter((app) => {
    return (
      (!filterDoctor || app.doctor === filterDoctor) &&
      (!filterPatient || app.patient === filterPatient)
    );
  });

  const tileContent = ({ date }) => {
    const dayApps = filteredAppointments.filter(
      (a) => new Date(a.date).toDateString() === date.toDateString()
    );

    return (
      <ul className="appointment-list">
        {dayApps.slice(0, 2).map((app) => (
          <li key={app.id}>
            {app.time} - {app.patient}
          </li>
        ))}
        {dayApps.length > 2 && <li className="more-text">+{dayApps.length - 2} more</li>}
      </ul>
    );
  };

  return (
    <div
      className={`calendar-page ${darkMode ? "dark" : ""}`}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/clinic-bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="calendar-overlay" />
      <div className="calendar-content">
        <div className="calendar-topbar">
          <h2 className="calendar-title">Appointment Calendar</h2>
          <button onClick={() => setDarkMode(!darkMode)} className="dark-toggle">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="filter-group">
          <div>
            <label>Doctor:</label>
            <select onChange={(e) => setFilterDoctor(e.target.value)} value={filterDoctor}>
              <option value="">All</option>
              {doctors.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Patient:</label>
            <select onChange={(e) => setFilterPatient(e.target.value)} value={filterPatient}>
              <option value="">All</option>
              {patients.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/*  MOBILE VIEW */}
        {isMobile ? (
          <>
            <input
              type="date"
              className="mobile-date-picker"
              value={value.toISOString().split("T")[0]}
              onChange={(e) => {
                const picked = new Date(e.target.value);
                setValue(picked);
                handleDayClick(picked);
              }}
            />
            <div className="mobile-day-view">
              <h3>{value.toDateString()}</h3>
              <ul className="appointment-list">
                {appointments
                  .filter((a) => new Date(a.date).toDateString() === value.toDateString())
                  .map((a) => (
                    <li key={a.id}>
                      {a.time} - {a.patient} with {a.doctor}
                    </li>
                  ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="calendar-box-wrapper">
            <div className="calendar-box">
              <Calendar
                value={value}
                onClickDay={handleDayClick}
                onChange={setValue}
                tileContent={tileContent}
              />
            </div>
          </div>
        )}

        {selectedDate && (
          <AppointmentForm
            date={selectedDate}
            appointments={appointments}
            setAppointments={setAppointments}
            closeForm={() => setSelectedDate(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarView;
