import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer, SlotInfo, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal } from '../../components/ui/Modal';
import { users, findUserById } from '../../data/users';
import { useAuth } from '../../context/AuthContext';

import { useCalendar } from '../../context/CalendarContext';

const localizer = momentLocalizer(moment);

interface MyEvent extends Event {
  status: 'availability' | 'pending' | 'confirmed' | 'declined';
  organizer: string;
  invitee?: string;
}

const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const { events, setEvents } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);
  const [selectedInvitee, setSelectedInvitee] = useState<string | undefined>(undefined);

  const otherUsers = useMemo(() => {
    if (!user) return [];
    return users.filter(u => u.id !== user.id);
  }, [user]);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedEvent(null);
    setSelectedSlot(slotInfo);
    setIsModalOpen(true);
  };
  
  const handleSelectEvent = (event: MyEvent) => {
    setSelectedSlot(null);
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    if (selectedSlot && user) {
      const newEvent: MyEvent = {
        start: selectedSlot.start,
        end: selectedSlot.end,
        title: selectedInvitee ? `Meeting with ${users.find(u => u.id === selectedInvitee)?.name}` : 'Availability',
        status: selectedInvitee ? 'pending' : 'availability',
        organizer: user.id,
        invitee: selectedInvitee,
      };
      setEvents([...events, newEvent]);
      closeModal();
    }
  };

  const handleUpdateEvent = () => {
    if (selectedEvent && user) {
      const updatedEvent: MyEvent = {
        ...selectedEvent,
        title: selectedInvitee ? `Meeting with ${users.find(u => u.id === selectedInvitee)?.name}` : 'Availability',
        status: selectedInvitee ? 'pending' : 'availability',
        organizer: user.id,
        invitee: selectedInvitee,
      };
      const updatedEvents = events.map(e => e === selectedEvent ? updatedEvent : e);
      setEvents(updatedEvents);
      closeModal();
    }
  };

  const handleDeleteEvent = () => {
    if(selectedEvent) {
      const updatedEvents = events.filter(e => e !== selectedEvent);
      setEvents(updatedEvents);
      closeModal();
    }
  }
  
  const handleEventAction = (status: 'confirmed' | 'declined') => {
    if (selectedEvent) {
      if(status === 'declined') {
        handleDeleteEvent();
        return;
      }
      const updatedEvents = events.map(e => e === selectedEvent ? {...e, status} : e);
      setEvents(updatedEvents);
      closeModal();
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedSlot(null);
    setSelectedEvent(null);
    setSelectedInvitee(undefined);
  };
  
  const eventStyleGetter = (event: MyEvent) => {
    let backgroundColor = '#3174ad'; // Default blue for availability
    if (event.status === 'pending') {
      backgroundColor = '#f0ad4e'; // Yellow
    } else if (event.status === 'confirmed') {
      backgroundColor = '#5cb85c'; // Green
    } else if (event.status === 'declined') {
      backgroundColor = '#d9534f'; // Red
    }
    return { style: { backgroundColor } };
  };

  const renderModalContent = () => {
    if (isEditMode && selectedEvent) {
      return (
        <div>
          <p>
            From{' '}
            {moment(selectedEvent.start).format('lll')} to{' '}
            {moment(selectedEvent.end).format('lll')}
          </p>

          <div className="mt-4">
            <label htmlFor="invitee" className="block text-sm font-medium text-gray-700">
              Invite someone (optional)
            </label>
            <select
              id="invitee"
              name="invitee"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedInvitee}
              onChange={(e) => setSelectedInvitee(e.target.value)}
            >
              <option value="">Just mark as available</option>
              {otherUsers.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
              onClick={handleUpdateEvent}
            >
              Save Changes
            </button>
          </div>
        </div>
      );
    }
    if (selectedSlot) {
      return (
        <div>
          <p>
            From{' '}
            {moment(selectedSlot.start).format('lll')} to{' '}
            {moment(selectedSlot.end).format('lll')}
          </p>

          <div className="mt-4">
            <label htmlFor="invitee" className="block text-sm font-medium text-gray-700">
              Invite someone (optional)
            </label>
            <select
              id="invitee"
              name="invitee"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedInvitee}
              onChange={(e) => setSelectedInvitee(e.target.value)}
            >
              <option value="">Just mark as available</option>
              {otherUsers.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
              onClick={handleAddEvent}
            >
              {selectedInvitee ? 'Send Request' : 'Add Slot'}
            </button>
          </div>
        </div>
      );
    }
    if(selectedEvent) {
      const organizer = findUserById(selectedEvent.organizer);
      const invitee = selectedEvent.invitee ? findUserById(selectedEvent.invitee) : null;
      
      return (
        <div>
          <h4 className="text-xl font-bold">{selectedEvent.title}</h4>
          <p className="mt-2">
            <span className="font-semibold">From:</span> {moment(selectedEvent.start).format('lll')}
          </p>
          <p>
            <span className="font-semibold">To:</span> {moment(selectedEvent.end).format('lll')}
          </p>
          <p>
            <span className="font-semibold">Status:</span> <span className="capitalize">{selectedEvent.status}</span>
          </p>
          <p>
            <span className="font-semibold">Organizer:</span> {organizer?.name}
          </p>
          {invitee && <p><span className="font-semibold">Invitee:</span> {invitee.name}</p>}
          
          {user?.id === selectedEvent.organizer && (
            <div className="mt-6 flex justify-end space-x-2">
               <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
                onClick={handleDeleteEvent}
              >
                Delete
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                onClick={() => setIsEditMode(true)}
              >
                Modify
              </button>
            </div>
          )}
          {selectedEvent.status === 'pending' && user?.id === selectedEvent.invitee && (
            <div className="mt-6 flex justify-end space-x-2">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
                onClick={() => handleEventAction('declined')}
              >
                Decline
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
                onClick={() => handleEventAction('confirmed')}
              >
                Accept
              </button>
            </div>
          )}
           {user?.id !== selectedEvent.organizer && (
            <div className="mt-6 flex justify-end space-x-2">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
                onClick={handleDeleteEvent}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )
    }
    return null;
  }

  return (
    <>
      <div className="h-[calc(100vh-4rem)]">
        <Calendar
          localizer={localizer}
          events={events.filter(e => e.status !== 'declined')}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditMode ? "Edit Event" : selectedEvent ? "Meeting Details" : "Add Availability"}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default CalendarPage;
