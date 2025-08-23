type Event = {
    eventId: number;
    title: string;
    description: string;
    featured: boolean;
    location: string;
    eventTime: string;
    imageURL?: string;
    createdAt?: string;
    updatedAt?: string;
};

export default Event;
