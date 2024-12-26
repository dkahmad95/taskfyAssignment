import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Task } from "@/app/lib/interfaces";
import SortableMobileRow from "./SortableMobileRow";

interface MobileViewTableProps {
  taskRows: Task[];
  onEditClick: (task: Task) => void;
  onDeleteClick: (taskName: string, taskId: number) => void;
}

const MobileViewTable = ({
  taskRows,
  onEditClick,
  onDeleteClick,
}: MobileViewTableProps) => {
  const [tasks, setTasks] = useState(taskRows);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((prevTasks) => {
        const oldIndex = prevTasks.findIndex((task) => task.id === active?.id);
        const newIndex = prevTasks.findIndex((task) => task.id === over?.id);
        return arrayMove(prevTasks, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks.map((task) => task?.id)}>
        <div className="md:hidden">
          {tasks.map((task) => (
            <SortableMobileRow
              key={task?.id}
              task={task}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default MobileViewTable;
