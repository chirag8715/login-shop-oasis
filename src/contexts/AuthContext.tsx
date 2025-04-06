
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface UserWithProfile extends User {
  profile?: {
    full_name?: string;
  };
}

interface AuthContextType {
  currentUser: UserWithProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserWithProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Fetch user profile data from the profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  // Update the user state with profile information
  const updateUserWithProfile = async (user: User | null) => {
    if (!user) {
      setCurrentUser(null);
      return;
    }

    const profile = await fetchUserProfile(user.id);
    const enhancedUser: UserWithProfile = {
      ...user,
      profile: profile || { full_name: user.user_metadata?.full_name }
    };
    
    setCurrentUser(enhancedUser);
  };
  
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        
        if (session?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase auth
          setTimeout(() => {
            updateUserWithProfile(session.user);
          }, 0);
        } else {
          setCurrentUser(null);
        }
        
        // Only set loading to false after first auth check
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Got session:', session);
      setSession(session);
      
      if (session?.user) {
        updateUserWithProfile(session.user);
      } else {
        setCurrentUser(null);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      console.log('Registering user:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          },
        },
      });
      
      if (error) {
        console.error('Registration error:', error);
        toast.error(error.message);
        throw error; // Throw error for the component to catch
      }
      
      if (data.user) {
        toast.success("Registration successful! Please check your email to confirm your account.");
        return true;
      } else {
        toast.error("Something went wrong during registration.");
        return false;
      }
    } catch (error: any) {
      console.error('Registration exception:', error);
      toast.error(error.message || "An error occurred during registration");
      throw error; // Rethrow for the component to handle
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Logging in user:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error:', error);
        // Don't toast here, let the component handle it
        throw error; // Throw the error for the component to catch
      }
      
      if (data.user) {
        toast.success("Login successful");
        return true;
      } else {
        toast.error("Something went wrong during login");
        return false;
      }
    } catch (error: any) {
      console.error('Login exception:', error);
      // Let the component handle the toast
      throw error; // Rethrow for better component-level handling
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.info("You have been logged out");
    }
  };

  const value = {
    currentUser,
    session,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
