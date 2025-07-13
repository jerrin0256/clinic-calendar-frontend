export const saveAppointments = (data) =>{
    localStorage.setItem('appointments', JSON.stringify(data));
};

export const getAppointments = () =>{
    const data = localStorage.getItem('appointments');
    return data ? JSON.parse(data) : [];
};
