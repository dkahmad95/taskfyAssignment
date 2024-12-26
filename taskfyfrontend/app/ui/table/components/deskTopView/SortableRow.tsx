import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Task } from "@/app/lib/interfaces";
import DifficultyStatus from "../../../sharedComponents/status";

interface SortableRowProps {
  task: Task;
  onEditClick: (task: Task) => void;
  onDeleteClick: (taskName: string, taskId: number) => void;
}

const SortableRow = ({
  task,
  onEditClick,
  onDeleteClick,
}: SortableRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full border-b py-3 text-sm last-of-type:border-none"
    >
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">{task?.taskName}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">{task?.assignee}</td>
      <td className="whitespace-nowrap px-3 py-3">{task?.dueDate}</td>
      <td className="whitespace-nowrap px-3 py-3">{task?.issueDate}</td>
      <td className="whitespace-nowrap px-3 py-3">{task?.hoursSpent}</td>
      <td className="whitespace-nowrap px-3 py-3">{task?.project}</td>
      <td className="whitespace-nowrap px-3 py-3">
        <DifficultyStatus status={task?.difficulty?.toLowerCase()} />
      </td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
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
            className="w-12 h-6 text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              if (task?.id) {
                onDeleteClick(task.taskName, task?.id);
              }
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default SortableRow;
