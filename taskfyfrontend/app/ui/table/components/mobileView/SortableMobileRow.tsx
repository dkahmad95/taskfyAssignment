import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  PencilIcon,
  TrashIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Task } from "@/app/lib/interfaces";
import DifficultyStatus from "@/app/ui/sharedComponents/status";

interface SortableMobileRowProps {
  task: Task;
  onEditClick: (task: Task) => void;
  onDeleteClick: (taskName: string, taskId: number) => void;
}

const SortableMobileRow = ({
  task,
  onEditClick,
  onDeleteClick,
}: SortableMobileRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, touchAction: "none", userSelect: "none" }}
      {...attributes}
      {...listeners}
      className="mb-2 w-full rounded-md bg-white p-4 border-t-2 border-blue-500 "
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="mb-2 flex items-center">{task?.taskName}</div>
          <p className="text-sm text-gray-500">{task?.assignee}</p>
        </div>
        <DifficultyStatus status={task?.difficulty} />
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <p className="text-lg">
            <span>{task?.project} </span>
            <span className="text-sm text-gray-500">{task?.hoursSpent}hr</span>
          </p>
          <div className="flex flex-row justify-center items-center text-xs gap-2">
            {task?.issueDate}
            <ArrowRightIcon className="w-4 h-4" />
            {task?.dueDate}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <PencilIcon
            className="w-12 h-6 text-blue-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (task?.id) {
                onEditClick(task);
              }
            }}
          />
          <TrashIcon
            className="w-12 h-6 text-red-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (task?.id) {
                onDeleteClick(task.taskName, task.id);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SortableMobileRow;
