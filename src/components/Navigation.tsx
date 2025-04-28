
import Link from 'next/link';
import AuthStatus from '@/components/AuthStatus';

const Navigation = () => {
  return (
    <nav className="bg-secondary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Eventide</Link>
        <div className="flex gap-4">
          <Link href="/event/create">Create Event</Link>
          <AuthStatus />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
