'use client' ;

import { createAccountAction } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import  Link  from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

function CreateAccountPage() {
    const router = useRouter() ;
    const [isPending , starttransition] = useTransition();
    
    

    const handleclickcreateaccount = async (formdata : FormData) => {
       starttransition(async () => {
        const {errorMessage} = await createAccountAction(formdata);
        if (!errorMessage) {
            router.replace('/')
            toast.success('Account created successfly\nYou are logged in', {
                duration:5000 ,
            })
        }else {
            toast.error(errorMessage);
        }
       })
    }
  return (
    <main className="flex min-h-screen items-center justify-center px-4 pb-24">
        <div className="bg-popover relative flex w-full max-w-sm flex-col items-center rounded-2xl border border-gray-400 p-8">
            <h1 className={`mb-8 text-2xl font-semibold ${isPending && "opacity-0"}`}>Create Account</h1>
            {isPending && (<div className="text-primary absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center flex-col gap-y-2">
                <p>creating account...</p>
                <Loader2 className="size-6 animate-spin"/>
            </div>)}
            <form className={`flex w-full flex-col gap-4 ${isPending && "opacity-0 -z-10"}`} action={handleclickcreateaccount}>
                <Input type="text" name="email" placeholder="Email" required disabled={isPending}/> 
                <Input type="password" name="password" placeholder="Password" required disabled={isPending}/>
                <Button>Create Account</Button>
                <p className="mt-3 text-xs text-center">
                    already have an account?
                    <Link href="/login" className="ml-2 underline transition-colors duration-200 ease-in-out hover:text-red-300">login</Link>
                </p>
            </form>
        </div>
    </main>
  )
}

export default CreateAccountPage ;