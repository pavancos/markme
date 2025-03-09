import { create } from "zustand";
import { EventType } from "./homeStore";

export interface SheetState {
    isOpen: boolean;
    selectedEvent: any | null;
    openBottomSheet: (event: any) => void;
    closeBottomSheet: () => void;
}

export const useSheetStore = create<SheetState>((set) => ({
    isOpen: false,
    selectedEvent: null,
    openBottomSheet: (event: any) => {
        
        set({ isOpen: true, selectedEvent: event });
    },
    closeBottomSheet: () => {
        set({ isOpen: false, selectedEvent: null });
    }
}));