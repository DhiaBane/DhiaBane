"use client"

import * as React from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange
  onDateRangeChange?: (dateRange: DateRange | undefined) => void
  setDate?: (date: Date) => void
}

export function DatePickerWithRange({ className, date, onDateRangeChange, setDate }: DatePickerWithRangeProps) {
  const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(date)

  const handleDateChange = (newDate: DateRange | undefined) => {
    setSelectedDate(newDate)
    onDateRangeChange?.(newDate)
    setDate?.(newDate?.from || new Date())
  }

  return (
    <div className={cn("relative", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[180px] justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate?.from ? (
              selectedDate.to ? (
                <>
                  {format(selectedDate.from, "d MMMM yyyy", { locale: fr })} -{" "}
                  {format(selectedDate.to, "d MMMM yyyy", { locale: fr })}
                </>
              ) : (
                format(selectedDate.from, "d MMMM yyyy", { locale: fr })
              )
            ) : (
              <span>Sélectionnez une date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selectedDate?.from}
            selected={selectedDate}
            onSelect={handleDateChange}
            numberOfMonths={1}
            locale={fr}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Exporter les différentes variantes du composant
export const DatePicker = DatePickerWithRange
export const DateRangePicker = DatePickerWithRange // Ajout de cet export pour résoudre l'erreur
