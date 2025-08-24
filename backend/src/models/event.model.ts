type Event = {
    eventId: number;
    title: string;
    description: string;
    featured: boolean;
    location: string;
    eventTime: string | Date;
    imageURL?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    clubId: number;
};

export default Event;
