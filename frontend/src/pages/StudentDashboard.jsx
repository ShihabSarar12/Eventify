import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { useAuth } from '../App';

const allEvents = [
    {
        id: 1,
        title: 'Tech Fest 2025',
        date: '2025-09-15',
        location: 'Auditorium A',
        category: 'Technology',
        image: 'https://source.unsplash.com/600x400/?technology,conference',
    },
    {
        id: 2,
        title: 'Music Night',
        date: '2025-09-20',
        location: 'Open Ground',
        category: 'Music',
        image: 'https://source.unsplash.com/600x400/?music,concert',
    },
    {
        id: 3,
        title: 'Robotics Workshop',
        date: '2025-09-25',
        location: 'Lab 101',
        category: 'Workshop',
        image: 'https://source.unsplash.com/600x400/?robotics,workshop',
    },
];

export default function StudentDashboard() {
    const { user } = useAuth();
    const [registered, setRegistered] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    const handleRegister = (event) => {
        if (!registered.some((e) => e.id === event.id)) {
            setRegistered([...registered, event]);
        }
    };

    const handleUnregister = (eventId) => {
        setRegistered(registered.filter((e) => e.id !== eventId));
    };

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/api/v1/student/upcoming-events',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: user?.id }),
                    }
                );
                const data = await response.json();

                if (data.data) {
                    setUpcomingEvents(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch upcoming events:', error);
            }
        };

        if (user?.id) {
            fetchUpcomingEvents();
        }
    }, [user]);

    return (
        <div className='grid gap-8 md:grid-cols-4'>
            {/* Sidebar */}
            <aside className='md:col-span-1 space-y-4'>
                <div className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 shadow-sm'>
                    <h2 className='text-lg font-semibold text-white'>
                        Hello, {user?.name || 'Student'} 👋
                    </h2>
                    <p className='mt-1 text-sm text-slate-300'>
                        Role: {user?.role}
                    </p>
                </div>
                <div className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 shadow-sm'>
                    <h3 className='text-sm font-semibold text-white'>
                        Quick Stats
                    </h3>
                    <p className='mt-2 text-sm text-slate-300'>
                        Registered:{' '}
                        <span className='font-semibold text-blue-300'>
                            {registered.length}
                        </span>
                    </p>
                    <p className='text-sm text-slate-300'>
                        Available:{' '}
                        <span className='font-semibold text-emerald-300'>
                            {allEvents.length}
                        </span>
                    </p>
                </div>
            </aside>

            {/* Content */}
            <section className='md:col-span-3 space-y-10'>
                {/* My Events */}
                <div>
                    <h2 className='text-xl font-semibold text-white mb-4'>
                        My Registered Events
                    </h2>
                    {registered.length === 0 ? (
                        <p className='text-slate-300 text-sm'>
                            You haven’t registered for any events yet.
                        </p>
                    ) : (
                        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                            {registered.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    action={
                                        <button
                                            onClick={() =>
                                                handleUnregister(event.id)
                                            }
                                            className='mt-3 w-full rounded-full border border-red-500 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20 transition'
                                        >
                                            Unregister
                                        </button>
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* All Events */}
                <div>
                    <h2 className='text-xl font-semibold text-white mb-4'>
                        Upcoming Events
                    </h2>
                    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {upcomingEvents.length === 0 ? (
                            <p className='text-slate-300 text-sm'>
                                No upcoming events found.
                            </p>
                        ) : (
                            upcomingEvents.map((event) => {
                                const isReg = registered.some(
                                    (e) => e.id === event.eventId
                                );
                                return (
                                    <EventCard
                                        key={event.eventId}
                                        event={event}
                                        action={
                                            isReg ? (
                                                <button
                                                    onClick={() =>
                                                        handleUnregister(
                                                            event.eventId
                                                        )
                                                    }
                                                    className='mt-3 w-full rounded-full border border-red-500 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20 transition'
                                                >
                                                    Unregister
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleRegister(event)
                                                    }
                                                    className='mt-3 w-full rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 ring-1 ring-white/10 transition'
                                                >
                                                    Register
                                                </button>
                                            )
                                        }
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
