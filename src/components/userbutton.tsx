'use client' ;
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserCircle } from 'lucide-react'
import {User} from '@supabase/supabase-js'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { logOuttAction } from '@/actions/user'
type Props = {
    user : User ;
    className?: string ;
}

export function UserButton({user , className}: Props) {
    const router = useRouter() ;
    const handlesignout = async () => {
      const toastId = toast.loading('Signing Out...')
      await logOuttAction() ;
      router.replace('/login') ;
      toast.dismiss(toastId);
    }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={cn('text-secondary transition-colors duration-200 ease-in-out hover:text-primary',className,)}>
        <UserCircle className='size-10 sm:size-12'/>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="ml-4 mt-5 sm:mt-4">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handlesignout} className='rounded-md p-2'>
              <h3 className='text-sm'>Sign Out</h3>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

  


export default UserButton ;