import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";

import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from "react";

// Define types
type ThemeMode = "light" | "dark";

interface State {
  themeMode: ThemeMode;
}

interface Action {
  type: string;
  payload: any;
}

interface Actions {
  setThemeMode: (themeMode: ThemeMode) => void;
}

interface ContextValue {
  state: State;
  actions: Actions;
  domains: Domain[]; // Domains will be provided via context
  setDomains: React.Dispatch<React.SetStateAction<Domain[]>>; // Function to update domains
  selectedPeriod: SelectedPeriod; // Add selectedPeriod
  setSelectedPeriod: React.Dispatch<React.SetStateAction<SelectedPeriod>>;
  startDate: Dayjs | null; // Add this
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>; // Add this
  endDate: Dayjs | null; // Add this
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>; // Add this
}

// Initial state
const initialState: State = {
  themeMode: "light",
};

// const router = useRouter();

// Reducer
const settingsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_THEME_MODE":
      const themeMode = action.payload;
      localStorage.setItem("themeMode", themeMode);
      return {
        ...state,
        themeMode,
      };
    default:
      return state;
  }
};

type SelectedPeriod =
  | "today"
  | "yesterday"
  | "thisweek"
  | "last7days"
  | "lastmonth"
  | "last30days"
  | "lastmonth"
  | "AllTime"
  | "Custom";
// | `${string} to ${string}`; // Add custom range format

interface Domain {
  id: string;
  domainName: string;
  type?: string; // Optional if not always present
  isActive?: boolean;
}

export const getUniqueDomains = (domain: any[] = []) => {
  const seen = new Set();
  return domain?.filter((item: any) => {
    if (seen.has(item.domainName)) {
      return false;
    } else {
      seen.add(item.domainName);
      return true;
    }
  });
};

export const SettingsContext = createContext<ContextValue>({
  state: initialState,
  actions: {
    setThemeMode: () => {},
  },
  domains: [],
  setDomains: () => {},

  startDate: null, // Correct this
  setStartDate: () => {},

  selectedPeriod: "last7days", // Initialize with a valid value of type SelectedPeriod

  setSelectedPeriod: () => {},
  endDate: null, // Correct this
  setEndDate: () => {}, // Correct this
});

// Create the context provider
interface SettingsProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: SettingsProviderProps) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  const [domains, setDomains] = useState<Domain[]>([]); // Use state for domains

  const [selectedPeriod, setSelectedPeriod] =
    useState<SelectedPeriod>("last7days");

  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  const setThemeMode = (themeMode: ThemeMode) => {
    dispatch({ type: "SET_THEME_MODE", payload: themeMode });
  };

  // Retrieve initial theme mode from localStorage on component initialization
  useEffect(() => {
    const storedThemeMode = localStorage.getItem("themeMode") as ThemeMode;
    if (storedThemeMode) {
      setThemeMode(storedThemeMode);
    }
  }, []);

  // Pass the state and actions to the context provider value
  const contextValue: ContextValue = {
    state,
    actions: {
      setThemeMode,
    },
    domains, // Provide domains state
    setDomains, // Provide setDomains function to update domains
    selectedPeriod, // Add this
    setSelectedPeriod, // Add this
    startDate, // Add this
    setStartDate, // Add this
    endDate, // Add this
    setEndDate, // Add this
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
