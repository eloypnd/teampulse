import { Button, Menu, Portal } from "@chakra-ui/react";
import { FaRegCalendar } from "react-icons/fa";
import { useState, useMemo } from "react";

export interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

const DateSelector = ({
  onRangeSelect,
}: {
  onRangeSelect?: (range: DateRange) => void;
}) => {
  const [selectedRange, setSelectedRange] = useState<string>("current");

  const dateRanges = useMemo(() => {
    const now = new Date();
    const ranges: DateRange[] = [];

    for (let i = 0; i < 6; i++) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      ranges.push({
        start,
        end,
        label: start.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      });
    }
    return ranges;
  }, []);

  const handleSelect = (index: number) => {
    setSelectedRange(dateRanges[index].label);
    onRangeSelect?.(dateRanges[index]);
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          <FaRegCalendar />
          {selectedRange === "current" ? "Choose date" : selectedRange}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {dateRanges.map((range, index) => (
              <Menu.Item
                key={range.label}
                value={`month-${index}`}
                onClick={() => handleSelect(index)}
              >
                {range.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default DateSelector;
