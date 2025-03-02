import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axiosInstance from "../utils/axiosInstance";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Event {
  id: string;
  title: string;
  start: string;
  description?: string;
  color?: string;
}

interface AppContextType {
  user: User | null;
  events: Event[];
  fetchUser: () => Promise<void>;
  fetchEvents: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get("/api/users/me");
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data } = await axiosInstance.get("/api/events");
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchEvents();
  }, []);

  return (
    <AppContext.Provider value={{ user, events, fetchUser, fetchEvents }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
