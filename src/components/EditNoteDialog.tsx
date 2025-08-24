"use client"
import { DeleteNoteAction, edditNoteAction } from '@/actions/notes';
import { Note } from '@/db/schemas/notes'
import { DialogContent, DialogTitle } from './ui/dialog';
import React, { Dispatch, SetStateAction, useTransition } from 'react'
import toast from 'react-hot-toast';
import { DialogFooter, DialogHeader } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
type Props = {
    setOpen : Dispatch<SetStateAction<boolean>>
    note : Note ;
}

function EditNoteDialog({setOpen , note}: Props) {
    const [isPending  , starttransition] = useTransition() ;

    const handleEditNoteDialog = async (formData:FormData) => {
        starttransition( async ()=> {
           const {errorMessage} = await edditNoteAction(formData) ;
           if (!errorMessage) {
            setOpen(false) ;
            toast.success('successfly edited note...') ;
           }else {
            toast.error(errorMessage) ;
           }
        })
    }
  return (
        <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader><DialogTitle>Edit Note</DialogTitle></DialogHeader>

        <form action={handleEditNoteDialog}>
            <Textarea id='text' name='text' disabled={isPending} defaultValue={note.text} className='mb-6 mt-2 min-h-[300px]' />
            <input type="text" hidden name='noteId' value={note.id} />
            <DialogFooter>
                <Button type='submit' disabled={isPending} className='w-40' variant={"secondary"}>
                   {isPending ? "Updating Note..." : "Update Note"}
                </Button>
            </DialogFooter>
        </form>
    </DialogContent>
  )
}

export default EditNoteDialog ;