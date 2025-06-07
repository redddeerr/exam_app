import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse (localStorage.getItem('isLoggedIn')) || false
);

const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem('appointments');
    return savedAppointments ? JSON.parse(savedAppointments) 
    : [
  { id: 1, type: 'Прием терапевта', date: '2025-06-10', time: '10:00', status: 'upcoming' },
    { id: 2, type: 'Диспансеризация', date: '2025-06-25', time: '14:30', status: 'upcoming' },
    { id: 3, type: 'Прием кардиолога', date: '2025-05-15', time: '11:00', status: 'past' },
     ];
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);
   

    const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem ('isLoggedIn',JSON.stringify(true));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem ('isLoggedIn');
  };

  const addAppointment = (newAppointment) => {
    setAppointments(prevAppointments => {
       const newId = prevAppointments.length > 0
        ? Math.max(...prevAppointments.map(app => app.id)) + 1
        : 1;
      const appointmentWithId = { ...newAppointment, id: newId, status: 'upcoming' };
            return [...prevAppointments, appointmentWithId];
    });
  };

  const cancelAppointment = (id) => {
    setAppointments(prevAppointments => {
      const updatedAppointments = prevAppointments.filter(appointment => appointment.id !== id);
      return updatedAppointments;
    });
  };

 return (
    <AuthContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      appointments,       
      addAppointment,       
      cancelAppointment     
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);