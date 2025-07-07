"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type CalendarFinalProps = {
  onDateTimeChange: (dateTimeISO: string) => void;
};

export function CalendarFinal({ onDateTimeChange }: CalendarFinalProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>()
  const [tempo, setTempo] = React.useState(() => {
    return new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  });
  React.useEffect(() => {
    if (date && tempo) {
      const [hh, mm, ss] = tempo.split(":");
      const newDate = new Date(date);
      newDate.setHours(Number(hh), Number(mm), Number(ss));
      onDateTimeChange(newDate.toISOString());
    }
  }, [date, tempo]);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-320 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Data Final"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="time"
          id="time-picker"
          step="1"
          defaultValue= {tempo}
          onChange={(e) => setTempo(e.target.value)}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}
