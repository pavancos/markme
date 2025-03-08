import { create } from 'zustand';

type BottomSheetStore = {
    isOpen: boolean;
    selectedEvent: any;
    openSheet: (event: any) => void;
    closeSheet: () => void;
};

export const useBottomSheetStore = create<BottomSheetStore>((set) => ({
    isOpen: false,
    selectedEvent: null,
    openSheet: (event) => {
        console.log("Opening BottomSheet for event:", event);
        set({ isOpen: true, selectedEvent: event })
    },
    closeSheet: () => set({ isOpen: false, selectedEvent: null }),
}));