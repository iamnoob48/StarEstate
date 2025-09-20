import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

export function BookVisitDialog({ onDateSelect }) {
  const [date, setDate] = useState()
 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Book a Visit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Date</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />

          <Button
            disabled={!date}
            onClick={() => {
              onDateSelect(date)
            }}
          >
            Confirm Visit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
