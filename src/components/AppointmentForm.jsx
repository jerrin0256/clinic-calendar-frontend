


import { useState } from "react";
import { doctors, patients } from "../data/doctorsPatients";
import { saveAppointments } from "../utils/storage";
import "./AppoimtmentForm.css";

const AppointmentForm = ({ date, appointments, setAppointments, closeForm }) => {
  const [doctor, setDoctor] = useState(doctors[0]);
  const [patient, setPatient] = useState(patients[0]);
  const [time, setTime] = useState("");
  const [editId, setEditId] = useState(null);

  const selectedDate = date.toDateString();
  const dailyAppointments = appointments.filter((a) => a.date === selectedDate);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newApp = {
      id: editId || Date.now(),
      date: selectedDate,
      doctor,
      patient,
      time,
    };

    let updated;
    if (editId) {
      updated = appointments.map((a) => (a.id === editId ? newApp : a));
    } else {
      updated = [...appointments, newApp];
    }

    setAppointments(updated);
    saveAppointments(updated);
    setDoctor(doctors[0]);
    setPatient(patients[0]);
    setTime("");
    setEditId(null);
    closeForm();
  };

  const handleDelete = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    saveAppointments(updated);
  };

  const handleEdit = (app) => {
    setDoctor(app.doctor);
    setPatient(app.patient);
    setTime(app.time);
    setEditId(app.id);
  };

  return (
    <div className="form-overlay">
      <div className="form-box">
        <h3>Appointments for {selectedDate}</h3>

        {dailyAppointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <ul className="app-list">
            {dailyAppointments.map((app) => (
              <li key={app.id}>
                <span>{app.time} - {app.patient} with {app.doctor}</span>
                <div className="actions">
                  <button onClick={() => handleEdit(app)}>✏️</button>
                  <button onClick={() => handleDelete(app.id)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <hr />

        <form onSubmit={handleSubmit} className="appointment-form">
          <label>Patient:</label>
          <select value={patient} onChange={(e) => setPatient(e.target.value)} required>
            {patients.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <label>Doctor:</label>
          <select value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
            {doctors.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

          <div className="form-buttons">
            <button type="submit">{editId ? "Update" : "Save"}</button>
            <button type="button" onClick={closeForm} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
