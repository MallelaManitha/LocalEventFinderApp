
import EventList from '@/components/EventList';

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Upcoming Events</h1>
      <EventList />
    </div>
  );
}
