'use server' ;
import { getErrorMessage } from '@/lib/utils';
import { getSupabaseAuth } from '@/lib/auth';



export const createAccountAction = async (formdata : FormData) => {
    try {
        const email = formdata.get('email') as string ;
        const password = formdata.get('password') as string ;
        const supabase = await getSupabaseAuth();
        const {error} = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error ;
        const {data , error:loginerror} = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (loginerror) throw loginerror ;
        if (!data.session) throw new Error('No Session');
        
        return {errorMessage : null} ;
    }catch (error) {
      return {errorMessage : getErrorMessage(error)}
    }
    
}

export const loginAction = async (formdata : FormData) => {
    try {
        const email = formdata.get('email') as string ;
        const password = formdata.get('password') as string ;
        const supabase = await getSupabaseAuth();
       
        const {data , error:loginerror} = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (loginerror) throw loginerror ;
        if (!data.session) throw new Error('No Session');
        
        return {errorMessage : null} ;
    }catch (error) {
      return {errorMessage : getErrorMessage(error)}
    }
    
}

export const logOuttAction = async () => {
    try {
        const supabase = await getSupabaseAuth();
        const {error} = await supabase.auth.signOut();
        if (error) throw error ;
          
        return {errorMessage : null} ;
    }catch (error) {
      return {errorMessage : getErrorMessage(error)}
    }
    
}