import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Type definition for calendar component props
// Extends the DayPicker component props
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Calendar component for date selection
// Provides a fully styled and accessible date picker interface
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        // Styling for the months container
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        // Individual month container
        month: "space-y-4",
        // Month caption with navigation
        caption: "flex justify-center pt-1 relative items-center",
        // Month and year label
        caption_label: "text-sm font-medium",
        // Navigation buttons container
        nav: "space-x-1 flex items-center",
        // Navigation button styling
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        // Previous month button positioning
        nav_button_previous: "absolute left-1",
        // Next month button positioning
        nav_button_next: "absolute right-1",
        // Calendar table layout
        table: "w-full border-collapse space-y-1",
        // Header row styling
        head_row: "flex",
        // Weekday header cell styling
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        // Calendar row styling
        row: "flex w-full mt-2",
        // Individual day cell styling
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        // Day button styling
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        // Range end day styling
        day_range_end: "day-range-end",
        // Selected day styling
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        // Today's date styling
        day_today: "bg-accent text-accent-foreground",
        // Days outside current month styling
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        // Disabled day styling
        day_disabled: "text-muted-foreground opacity-50",
        // Middle days in range styling
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        // Hidden day styling
        day_hidden: "invisible",
        ...classNames,
      }}
      // Custom navigation icons
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
