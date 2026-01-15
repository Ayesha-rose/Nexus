import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle, HelpCircle } from 'lucide-react';
import Joyride, { Step } from 'react-joyride';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { useCalendar } from '../../context/CalendarContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors, findUserById } from '../../data/users';

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const { events } = useCalendar();
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const [recommendedInvestors] = useState(investors.slice(0, 3));
  const [runTour, setRunTour] = useState(false);

  const tourSteps: Step[] = [
    {
      target: '[data-joyride="welcome"]',
      content: 'Welcome to your dashboard! This is your command center.',
      placement: 'bottom',
    },
    {
      target: '[data-joyride="summary-cards"]',
      content: "These cards give you a quick overview of your startup's activity.",
    },
    {
      target: '[data-joyride="upcoming-meetings"]',
      content: 'Keep track of your upcoming meetings with investors here.',
    },
    {
      target: '[data-joyride="collaboration-requests"]',
      content: 'Review and respond to collaboration requests from potential investors.',
    },
    {
      target: '[data-joyride="recommended-investors"]',
      content: 'Discover investors that could be a good fit for your startup.',
    },
    {
      target: '[data-joyride="find-investors"]',
      content: 'Click here to browse and search for more investors.',
    },
  ];

  useEffect(() => {
    if (user) {
      // Load collaboration requests
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);

      // Start tour for new users
      const isNewUser = !localStorage.getItem(`tour_completed_${user.id}`);
      if (isNewUser) {
        setRunTour(true);
      }
    }
  }, [user]);

  const handleRequestStatusUpdate = (requestId: string, status: 'accepted' | 'rejected') => {
    setCollaborationRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status } : req
      )
    );
  };

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') {
      setRunTour(false);
      if (user) {
        localStorage.setItem(`tour_completed_${user.id}`, 'true');
      }
    }
  };

  if (!user) return null;

  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');
  const upcomingMeetings = events.filter(e => (e.status === 'confirmed' || e.status === 'pending') && (e.organizer === user.id || e.invitee === user.id));

  return (
    <div className="space-y-6 animate-fade-in">
      <Joyride
        steps={tourSteps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#4F46E5',
            textColor: '#374151',
            arrowColor: '#FFFFFF',
            backgroundColor: '#FFFFFF',
          },
          buttonClose: {
            color: '#6B7280',
          },
          buttonNext: {
            backgroundColor: '#4F46E5',
          },
          buttonBack: {
            color: '#6B7280',
          }
        }}
      />
      <div className="flex justify-between items-center">
        <div data-joyride="welcome">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-600">Here's what's happening with your startup today</p>
        </div>

        <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => setRunTour(true)}
                leftIcon={<HelpCircle size={16} />}
            >
                Start Tour
            </Button>
            <Link to="/investors" data-joyride="find-investors">
              <Button
                leftIcon={<PlusCircle size={18} />}
              >
                Find Investors
              </Button>
            </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-joyride="summary-cards">
        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Bell size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">Pending Requests</p>
                <h3 className="text-xl font-semibold text-primary-900">{pendingRequests.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-full mr-4">
                <Users size={20} className="text-secondary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700">Total Connections</p>
                <h3 className="text-xl font-semibold text-secondary-900">
                  {collaborationRequests.filter(req => req.status === 'accepted').length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-accent-50 border border-accent-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4">
                <Calendar size={20} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-700">Upcoming Meetings</p>
                <h3 className="text-xl font-semibold text-accent-900">{upcomingMeetings.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-success-50 border border-success-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <TrendingUp size={20} className="text-success-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-success-700">Profile Views</p>
                <h3 className="text-xl font-semibold text-success-900">24</h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Upcoming meetings list */}
      <Card data-joyride="upcoming-meetings">
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Upcoming Meetings</h2>
        </CardHeader>
        <CardBody>
          {upcomingMeetings.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {upcomingMeetings.map(meeting => {
                const otherUserId = meeting.organizer === user.id ? meeting.invitee : meeting.organizer;
                const otherUser = findUserById(otherUserId);

                return (
                  <li key={meeting.start?.toString()} className="py-3 flex justify-between items-center">
                    <div>
                      {meeting.status === 'confirmed' ? (
                        <p className="font-semibold text-green-500">
                          Your meeting with {otherUser?.name} is confirmed
                        </p>
                      ) : (
                        <p className="font-semibold text-yellow-500">
                          Your meeting with {otherUser?.name} is still pending
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        {new Date(meeting.start!).toLocaleString()}
                      </p>
                    </div>
                    <Link to="/calendar">
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No upcoming meetings.</p>
              <Link to="/calendar">
                <Button variant="outline" className="mt-2">
                  Go to Calendar
                </Button>
              </Link>
            </div>
          )}
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collaboration requests */}
        <div className="lg:col-span-2 space-y-4" data-joyride="collaboration-requests">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Collaboration Requests</h2>
              <Badge variant="primary">{pendingRequests.length} pending</Badge>
            </CardHeader>

            <CardBody>
              {collaborationRequests.length > 0 ? (
                <div className="space-y-4">
                  {collaborationRequests.map(request => (
                    <CollaborationRequestCard
                      key={request.id}
                      request={request}
                      onStatusUpdate={handleRequestStatusUpdate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <AlertCircle size={24} className="text-gray-500" />
                  </div>
                  <p className="text-gray-600">No collaboration requests yet</p>
                  <p className="text-sm text-gray-500 mt-1">When investors are interested in your startup, their requests will appear here</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Recommended investors */}
        <div className="space-y-4" data-joyride="recommended-investors">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Recommended Investors</h2>
              <Link to="/investors" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                View all
              </Link>
            </CardHeader>

            <CardBody className="space-y-4">
              {recommendedInvestors.map(investor => (
                <InvestorCard
                  key={investor.id}
                  investor={investor}
                  showActions={false}
                />
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};