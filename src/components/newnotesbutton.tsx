'use client'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import NewNoteDialog from './newnotedialog';
import { cn } from '@/lib/utils';

function NewNotesButton({className}:{className?:string}) {
    const [open , setopen] = useState(false) ;
  return (
    <Dialog open={open} onOpenChange={(open) => setopen(open)}>
        <DialogTrigger className={cn('text-secondary transition-colors duration-200 ease-in-out hover:text-primary',className,)}
        onClick={() => setopen(true)}>
            <Plus className='size-10 sm:size-12'/>
        </DialogTrigger>

        <NewNoteDialog setopen={setopen}/>
    </Dialog>
    
  )
}

export default NewNotesButton ;