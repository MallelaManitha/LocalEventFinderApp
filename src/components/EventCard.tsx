
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { format } from 'date-fns';

interface Event {
  id: string;
  name: string;
  location: string;
  dateTime: any; // Timestamp
  description: string;
  imageUrl: string;
  createdBy: string;
  createdAt: any; // Timestamp
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {

  const formattedDate = event.dateTime ? format(event.dateTime.toDate(), 'PPP') : 'N/A';
  const formattedTime = event.dateTime ? format(event.dateTime.toDate(), 'p') : 'N/A';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription>{event.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={event.imageUrl} alt={event.name} className="rounded-md mb-4 w-full h-48 object-cover" />
        <p className="text-sm text-muted-foreground">{event.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-sm">
          <p>Date: {formattedDate}</p>
          <p>Time: {formattedTime}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
