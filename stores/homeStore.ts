import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type EventType = {
    name: string;
    timings: {
        start: Date;
        end: Date;
    };
    status: "Upcoming" | "Live" | "Hold" | "Ongoing" | "Archived";
    venue: string | { name: string };
    poster?: string;
    attendeesCount?: number;
};

interface HomeState {
    events: {
        upcomingEvents: EventType[];
        pastEvents: EventType[];
    };
    setEvents: (events: { upcomingEvents: EventType[]; pastEvents: EventType[] }) => void;
    fetchEvents: () => Promise<void>;
}

export const useHomeStore = create<HomeState>((set) => ({
    events: {
        upcomingEvents: [],
        pastEvents: [],
    },
    setEvents: (events) => set({ events }),
    fetchEvents: async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            if (!token) {
                console.error("No token found in AsyncStorage");
                return;
            }
            token = token ? JSON.parse(token) : null;
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${token}`);
            const response = await fetch("https://markmeengine.vercel.app/v1/user/events", {
                method: "GET",
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.payload) {
                const transformedEvents = {
                    upcomingEvents: data.payload.upcomingEvents.map((event: any) => ({
                        ...event,
                        timings: {
                            start: new Date(event.timings.start),
                            end: new Date(event.timings.end),
                        },
                    })),
                    pastEvents: data.payload.pastEvents.map((event: any) => ({
                        ...event,
                        timings: {
                            start: new Date(event.timings.start),
                            end: new Date(event.timings.end),
                        },
                    })),
                };

                set({ events: transformedEvents });
            } else {
                console.error("Invalid API response:", data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    },
}));
