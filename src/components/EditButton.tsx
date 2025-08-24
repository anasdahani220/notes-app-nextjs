"use client"
import { Note } from '@/db/schemas/notes'
import { Dialog, DialogTrigger } from './ui/dialog';
import { Edit } from 'lucide-react';
import React, { useState } from 'react'
import EditNoteDialog from './EditNoteDialog';
type Props = {
    note : Note ;
}

function EditButton({note}: Props) {
    const [open , setOpen] = useState(false) ;
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger onClick={() => setOpen(true)}>
            <Edit className='text-muted-foreground size-4'/>
        </DialogTrigger>
        <EditNoteDialog setOpen={setOpen} note={note} />
    </Dialog>
  )
}

export default EditButton ;