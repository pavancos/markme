import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { EventType, UserInEventType } from "./homeStore";
import { BE_URL } from "@/constants/config";

export type SpaceType = {
    _id: string;
    name:string;
    icon:string;
    followers:UserInEventType;
    admins:UserInEventType;
    events:EventType[];
    createdOn: Date;
}

export type UserProfile={
    _id:string;
    name:string;
    username:string;
    avatar:string;
    managingEvents: EventType[];
    registeredEvents: EventType[];
    managingSpaces: SpaceType[];
    followingSpaces: SpaceType[];
}

interface ProfileState {
    profile: UserProfile;
    setProfile: (profile: UserProfile) => void;
    fetchProfile: (token:string) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set)=>({
    profile: {
        _id: "",
        name: "",
        username: "",
        avatar: "",
        managingEvents: [],
        registeredEvents: [],
        managingSpaces: [],
        followingSpaces: []
    },
    setProfile: (profile) => set({ profile }),
    fetchProfile: async (token) => {
        try {
            let response = await fetch(`${BE_URL}/user/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if(!response.ok){
                console.error('HTTP error! Status: ', response.status);
                return
            }
            let data = await response.json();
            if(data.error){
                console.error(data.error);
                return;
            }
            if(data&&data.payload){
                set({ profile: data.payload });
            }
        } catch (error) {
            console.log(error);
        }
    }
}))