
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      }
    );

    // Then check for existing session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('Attempting signup with:', { email, name });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          },
          // Remove emailRedirectTo to avoid confirmation issues
        }
      });

      console.log('Signup response:', { data, error });

      if (error) {
        console.error('Sign up error:', error);
        return { error, data };
      }

      // If user is created and we have a session, great!
      if (data.user && data.session) {
        console.log('Signup successful with immediate session');
        return { error: null, data };
      }

      // If user is created but no session, try to sign in immediately
      if (data.user && !data.session) {
        console.log('User created but no session - trying immediate signin');
        
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) {
          console.error('Immediate signin failed:', signInError);
          return { error: signInError, data };
        }

        console.log('Immediate signin successful:', signInData);
        return { error: null, data: signInData };
      }

      return { error, data };
    } catch (error) {
      console.error('Sign up exception:', error);
      return { error: error as any };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting signin with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      console.log('Signin response:', { data, error });

      if (error) {
        console.error('Sign in error:', error);
      } else {
        console.log('Sign in successful:', data);
      }

      return { error, data };
    } catch (error) {
      console.error('Sign in exception:', error);
      return { error: error as any };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
      } else {
        console.log('Sign out successful');
      }

      return { error };
    } catch (error) {
      console.error('Sign out exception:', error);
      return { error: error as any };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };
}
