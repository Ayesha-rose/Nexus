import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from 'react-big-calendar';

interface MyEvent extends Event {
  status: 'availability' | 'pending' | 'confirmed' | 'declined';
  organizer: string;
  invitee?: string;
}

interface CalendarContextType {
  events: MyEvent[];
  setEvents: React.Dispatch<React.SetStateAction<MyEvent[]>>;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<MyEvent[]>([]);

  return (
    <CalendarContext.Provider value={{ events, setEvents }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
