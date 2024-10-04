'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut } from 'lucide-react'

interface LogoutButtonProps {
  onLogout: () => void;
}

export function LogoutButtonComponent({ onLogout }: LogoutButtonProps) {
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" className="h-10 w-10 rounded-full">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Log out</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[90vw] w-full sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            This will end your current session and return to the login screen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}