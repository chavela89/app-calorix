
import React from "react";
import { Card } from "@/components/ui/card";
import { WaterTracker } from "@/components/WaterTracker";
import { Calendar } from "@/components/ui/calendar";

interface SidePanelProps {
  water: {
    current: number;
    goal: number;
    onAdd: () => void;
    onRemove: () => void;
  };
  date: {
    selected: Date;
    onSelect: (date: Date | undefined) => void;
  };
}

export function SidePanel({ water, date }: SidePanelProps) {
  return (
    <div className="col-span-1 lg:col-span-1">
      <WaterTracker
        current={water.current}
        goal={water.goal}
        onAdd={water.onAdd}
        onRemove={water.onRemove}
      />
      
      <Card className="p-4 mt-6">
        <h3 className="text-md font-semibold mb-3">calendar</h3>
        <Calendar
          mode="single"
          selected={date.selected}
          onSelect={date.onSelect}
          className="w-full border rounded-md"
        />
      </Card>
    </div>
  );
}
