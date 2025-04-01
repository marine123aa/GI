import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

interface FilterSectionProps {
  onDateRangeChange?: (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  onCategoryChange?: (categories: Record<string, boolean>) => void;
}

const categories = [
  { id: "sexual", label: "Sexual" },
  { id: "violence", label: "Violence" },
  { id: "discrimination", label: "Discrimination" },
  { id: "illegal", label: "Illegal" },
  { id: "fake", label: "Fake" },
  { id: "shocking", label: "Shocking" },
  { id: "culture", label: "Culture" },
  { id: "privacy", label: "Privacy" },
  { id: "disrespect", label: "Disrespect" },
  { id: "etc", label: "Etc" },
];

const FilterSection: React.FC<FilterSectionProps> = ({
  onDateRangeChange = () => {},
  onCategoryChange = () => {},
}) => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)), // Default to last 30 days
    to: new Date(),
  });

  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, boolean>
  >(
    categories.reduce(
      (acc, category) => ({ ...acc, [category.id]: false }),
      {},
    ),
  );

  const [fromCalendarOpen, setFromCalendarOpen] = useState(false);
  const [toCalendarOpen, setToCalendarOpen] = useState(false);

  const handleDateRangeChange = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    setDateRange(range);
    onDateRangeChange(range);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const updatedCategories = { ...selectedCategories, [categoryId]: checked };
    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Filter Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Date Range Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Prompt Generation Period</h3>
            <div className="flex items-center space-x-4">
              <div className="grid gap-2">
                <Label htmlFor="from-date">From</Label>
                <Popover
                  open={fromCalendarOpen}
                  onOpenChange={setFromCalendarOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      id="from-date"
                      variant="outline"
                      className="w-[200px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        format(dateRange.from, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => {
                        handleDateRangeChange({ ...dateRange, from: date });
                        setFromCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <span className="text-lg">~</span>

              <div className="grid gap-2">
                <Label htmlFor="to-date">To</Label>
                <Popover open={toCalendarOpen} onOpenChange={setToCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="to-date"
                      variant="outline"
                      className="w-[200px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? (
                        format(dateRange.to, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => {
                        handleDateRangeChange({ ...dateRange, to: date });
                        setToCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <Separator />

          {/* Category Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Category Selection</h3>
            <p className="text-sm text-gray-500">
              Select categories to filter prompts (O = Include, X = Exclude)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories[category.id]}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked === true)
                    }
                  />
                  <Label
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSection;
