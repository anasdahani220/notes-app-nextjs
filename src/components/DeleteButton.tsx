'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTrigger } from './ui/alert-dialog';
import { Trash } from 'lucide-react';
import React, { useState, useTransition } from 'react'
import { AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog';
import toast from 'react-hot-toast';
import { DeleteNoteAction } from '@/actions/notes';

function DeleteButton({ noteId }: { noteId: number}) {
    const [open , setOpen] = useState(false) ;
    const [isPending , starttransition] = useTransition() ;

    const handleDelete = async () => {
        starttransition(async  () => {
           const {errorMessage} = await DeleteNoteAction(noteId)
           if(!errorMessage) {
            setOpen(false) ;
            toast.success('successfly deleted note...')
           }else{
            toast.error(errorMessage) ;
           }
        })
    }
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger className='absolute -right-2' onClick={() => setOpen(true)}>
                <Trash className='text-destructive/50 size-5'/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    Are You Sure You Want To Deletee This Note?
                </AlertDialogHeader>
                <AlertDialogDescription>
                    this action cannot be undone. this whill be permanently delete this note from all records.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending} onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <form action={handleDelete}>
                        <AlertDialogAction type='submit' className='bg-destructive hover:bg-destructive hover:brightness-110'>
                            {isPending ? "deleting note..." : "delete note"}
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteButton;