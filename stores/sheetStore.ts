import { create } from "zustand";
import { EventType } from "./homeStore";

export interface SheetState {
    isOpen: boolean;
    isCreateOpen: boolean;
    isCreateEventOpen: boolean;
    isCreateSpaceOpen: boolean;
    selectedEvent: any | null;
    openBottomSheet: (event: any) => void;
    closeBottomSheet: () => void;
    openCreateSheet:()=>void;
    closeCreateSheet:()=>void;
    openCreateEventSheet:()=>void;
    closeCreateEventSheet:()=>void;
    openCreateSpaceSheet:()=>void;
    closeCreateSpaceSheet:()=>void;
}

export const useSheetStore = create<SheetState>((set) => ({
    isOpen: false,
    isCreateOpen: false,
    isCreateEventOpen: false,
    isCreateSpaceOpen: false,
    selectedEvent: null,
    openBottomSheet: (event: any) => {
        set({ isOpen: true, selectedEvent: event });
    },
    closeBottomSheet: () => {
        set({ isOpen: false, selectedEvent: null });
    },
    openCreateSheet:()=>{
        set({isCreateOpen:true})
    },
    closeCreateSheet:()=>{
        set({isCreateOpen:false})
    },
    openCreateEventSheet:()=>{
        
        set({isCreateEventOpen:true})
    },
    closeCreateEventSheet:()=>{
        set({isCreateEventOpen:false})
    },
    openCreateSpaceSheet:()=>{
        set({isCreateSpaceOpen:true})
    },
    closeCreateSpaceSheet:()=>{
        set({isCreateSpaceOpen:false})
    }
}));