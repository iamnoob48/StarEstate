import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function RatingModal({ open, onClose, onSubmit }) {
  const [rating, setRating] = useState(0)

  const handleStarClick = (value) => {
    setRating(value)
  }

  const handleSubmit = () => {
    onSubmit(rating) // send rating to parent/backend
    setRating(0)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Rate Your Visit</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-2 py-6">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`w-8 h-8 cursor-pointer transition-colors ${
                value <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleStarClick(value)}
            />
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
