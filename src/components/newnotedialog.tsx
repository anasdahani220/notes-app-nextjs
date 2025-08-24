import {
  
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import React, { useTransition, Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"
import { addNewNoteAction } from "@/actions/notes"

type Props = {
    setopen : Dispatch<SetStateAction<boolean>>
}
function NewNoteDialog({setopen}: Props) {
    const [isPending , starttransition] = useTransition() ;
    const handleAddNewNote = async (formdata : FormData) => {
        starttransition(async ()=> {
            const {errorMessage} = await addNewNoteAction(formdata) ;
            if (!errorMessage) {
                setopen(false) ;
                toast.success('successfly adding note...');
            }else {
                toast.error(errorMessage) ;
            }
        })
    }
  return (
    <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader><DialogTitle>Add New Note</DialogTitle></DialogHeader>

        <form action={handleAddNewNote}>
            <Textarea id='text' name='text' disabled={isPending} className='mb-6 mt-2 min-h-[300px]' />
            <DialogFooter>
                <Button type='submit' disabled={isPending} className='w-40' variant={"secondary"}>
                   {isPending ? "Adding Note..." : "Add Note"}
                </Button>
            </DialogFooter>
        </form>
    </DialogContent>
  )
}

export default NewNoteDialog ;