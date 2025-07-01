import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

const sessions = [
  {
    title: 'Arduino Sensor Integration',
    group: 'Arduino Masterclass Group',
    time: 'Tomorrow, 7:00 PM',
    attendees: 20,
    color: 'blue'
  },
  {
    title: 'ROS Navigation Stack Workshop',
    group: 'ROS Study Group',
    time: 'Wednesday, 6:30 PM',
    attendees: 14,
    color: 'green'
  },
  {
    title: '3D Printing Troubleshooting',
    group: '3D Printing for Robotics',
    time: 'Friday, 5:00 PM',
    attendees: 26,
    color: 'orange'
  }
];

const UpcomingSessions = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Upcoming Study Sessions</h3>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {sessions.map((session, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <div className={`bg-${session.color}-100 dark:bg-${session.color}-900 p-3 rounded-lg mr-4`}>
                    <Calendar className={`h-5 w-5 text-${session.color}-600 dark:text-${session.color}-300`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{session.title}</h4>
                    <p className="text-sm text-muted-foreground">{session.group}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{session.time}</span>
                  </div>
                  <Badge variant="outline" className="mt-1">{session.attendees} attendees</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingSessions;
