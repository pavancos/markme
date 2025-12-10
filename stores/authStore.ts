import { create } from 'zustand';
import { BE_URL } from '@/constants/config';
type UserType = {
    username: string,
    email: string,
    profilePhoto: string;
    gender: 'Male' | 'Female'
    fullname: string,
    token: string;
    managingSpaces: {
        id: string;
        name: string;
    }[]
}
interface AuthState {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    user: null | UserType;
    setUser: (user: UserType) => void;
    verifyToken: ({ token }: { token: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: () => set({ isAuthenticated: true }),
    logout: () => set({ isAuthenticated: false }),
    setUser: (user: UserType) => {
        set({ isAuthenticated: true });
        set({ user });
    },
    verifyToken: async ({ token }: { token: string }) => {
        try {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', `Bearer ${token}`);
            let response = await fetch(`${BE_URL}/user/verify`, {
                method: 'GET',
                headers: headers
            });
            let data;
            if (response.ok) {
                data = await response.json();
            }
            set({ isAuthenticated: true });
            set({ user: { ...data.payload.user, token: token } });
        } catch (e) {
            set({ isAuthenticated: false });
            set({ user: null });
        }
    }
}));
