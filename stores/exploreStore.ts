import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { EventType } from "./homeStore";
import { BE_URL } from "@/constants/config";
import { SpaceType } from "./profileStore";

interface ExploreState {
    events: EventType[];
    spaces: SpaceType[];
    setAllEvents: (events: EventType[]) => void;
    fetchAllEvents: () => Promise<void>;
}

export const useExploreStore = create<ExploreState>((set) => ({
    events: [],
    spaces: [],
    setAllEvents: (events) => set({ events }),
    fetchAllEvents: async () => {
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
            const response = await fetch(BE_URL + "/event/all", {
                method: "GET",
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.payload && data.payload.events) {
                const transformedEvents = data.payload.events.map((event: any) => ({
                    ...event,
                    timings: {
                        start: new Date(event.timings.start!),
                        end: new Date(event.timings.end!),
                    },
                }));
                const spaces = data.payload.spaces.map((space: any) => ({
                    ...space,
                    createdOn: new Date(space.createdOn)
                }))
                set({ events: transformedEvents });
                set({ spaces });
            } else {
                console.error("Invalid API response:", data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    },
}));
