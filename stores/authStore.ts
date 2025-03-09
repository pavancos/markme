import { create } from 'zustand';

type UserType = {
    username: string,
    email: string,
    profilePhoto: string;
    gender: 'Male' | 'Female'
    fullname: string,
    token: string;
}
interface AuthState {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    user: null | UserType;
    setUser: (user: UserType) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: () => set({ isAuthenticated: true }),
    logout: () => set({ isAuthenticated: false }),
    setUser: (user: UserType) => {
        set({ isAuthenticated: true });
        set({ user });
    }
}));