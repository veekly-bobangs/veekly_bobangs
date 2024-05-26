"use client"
import { API_ENDPOINTS, PAGE_PATHS } from '@/constants';
import { showErrorNotification, showNotification } from '@/utils';
import { fetchPost } from '@/utils/browserHttpRequests';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkLogin: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const res = await fetchPost(
      `${API_ENDPOINTS.LOGIN}`,
      {
        email: email,
        password: password
      }
    );
    
    if (res.error) {
      showErrorNotification("Could not authenticate user: " + res.error);
      return;
    }

    showNotification("Success", "Logged in successfully");
    checkLogin();
    return router.push(PAGE_PATHS.HOME)
  }

  const logout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      showErrorNotification("Could not logout user: " + error.message);
    } else {
      setUser(null);
      router.push(PAGE_PATHS.LOGIN);
    }
  }

  const checkLogin = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
      showErrorNotification("Could not authenticate user: " + error.message);
    } else {
      setUser(data?.session?.user ?? null);
    }
  }

  React.useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value = {{ user, login, logout, checkLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
}
