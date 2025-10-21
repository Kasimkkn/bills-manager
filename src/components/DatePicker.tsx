import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
    value?: string;
    onChange: (date: string) => void;
    placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    placeholder = "Pick a date",
}) => {
    const dateValue = value ? new Date(value) : undefined;

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatDateToString = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!dateValue && "text-muted-foreground"
                        }`}
                >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateValue ? formatDate(dateValue) : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                    mode="single"
                    selected={dateValue}
                    onSelect={(date) => {
                        if (date) {
                            onChange(formatDateToString(date));
                        }
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;