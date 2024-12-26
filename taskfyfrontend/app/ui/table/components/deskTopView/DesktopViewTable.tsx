import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import "react-resizable/css/styles.css";
import { Task } from "@/app/lib/interfaces";
import { Select } from "../../../sharedComponents/select";
import { Input } from "../../../sharedComponents/input";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskOrder } from "@/app/lib/redux/taskRedux";
import { RootState } from "@/app/lib/redux/store";
import SortableRow from "./SortableRow";
import { initialWidths, optionsArray } from "./utils";

interface DesktopViewTableProps {
  onEditClick: (task: Task) => void;
  onDeleteClick: (taskName: string, taskId: number) => void;
}

const DesktopViewTable = ({
  onEditClick,
  onDeleteClick,
}: DesktopViewTableProps) => {
  const updatedTaskRows: Task[] = useSelector(
    (state: RootState) => state.task.Task
  );

  const [tasks, setTasks] = useState<Task[]>(updatedTaskRows);
  const [filterColumn, setFilterColumn] = useState<keyof Task | "">("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof Task | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [columnWidths, setColumnWidths] = useState(initialWidths);

  const handleResize = (column: keyof typeof columnWidths, width: number) => {
    setColumnWidths((prevWidths) => ({
      ...prevWidths,
      [column]: width,
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleFilterColumnChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterColumn(e.target.value as keyof Task);
  };

  const handleSort = (column: keyof Task) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterColumn && filterValue) {
      const value = task[filterColumn];
      return value
        ?.toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    }
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const dispatch = useDispatch();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active?.id !== over?.id) {
      const oldIndex = tasks.findIndex((task) => task?.id === active?.id);
      const newIndex = tasks.findIndex((task) => task?.id === over?.id);
      const newTasks = arrayMove(tasks, oldIndex, newIndex);

      setTasks(newTasks);
      dispatch(updateTaskOrder(newTasks));
    }
  };

  return (
    <>
      <div className="mb-4 flex flex-row">
        <Select
          onChange={handleFilterColumnChange}
          value={filterColumn}
          className="border p-2 w-[300px]"
          options={optionsArray}
        />

        <Input
          type="text"
          placeholder="Filter value"
          value={filterValue}
          onChange={handleFilterChange}
          className="border p-2 ml-2"
          disabled={!filterColumn}
        />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks.map((task) => task?.id)}>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-5 font-medium sm:pl-6 cursor-pointer"
                  onClick={() => handleSort("taskName")}
                >
                  <ResizableBox
                    width={columnWidths.taskName}
                    height={0}
                    axis="x"
                    resizeHandles={["e"]}
                    onResizeStop={(_e: any, data: ResizeCallbackData) =>
                      handleResize("taskName", data.size.width)
                    }
                  >
                    <div style={{ width: columnWidths.taskName }}>
                      Task Name
                    </div>
                  </ResizableBox>
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium cursor-pointer"
                  onClick={() => handleSort("assignee")}
                >
                  <ResizableBox
                    width={columnWidths.assignee}
                    height={0}
                    axis="x"
                    resizeHandles={["e"]}
                    onResizeStop={(_e: any, data: ResizeCallbackData) =>
                      handleResize("assignee", data.size.width)
                    }
                  >
                    <div style={{ width: columnWidths.assignee }}>Assignee</div>
                  </ResizableBox>
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium cursor-pointer"
                  onClick={() => handleSort("dueDate")}
                >
                  <ResizableBox
                    width={columnWidths.dueDate}
                    height={0}
                    axis="x"
                    resizeHandles={["e"]}
                    onResizeStop={(_e: any, data: ResizeCallbackData) =>
                      handleResize("dueDate", data.size.width)
                    }
                  >
                    <div style={{ width: columnWidths.dueDate }}>Due Date</div>
                  </ResizableBox>
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium cursor-pointer"
                  onClick={() => handleSort("issueDate")}
                >
                  <ResizableBox
                    width={columnWidths.issueDate}
                    height={0}
                    axis="x"
                    resizeHandles={["e"]}
                    onResizeStop={(_e: any, data: ResizeCallbackData) =>
                      handleResize("issueDate", data.size.width)
                    }
                  >
                    <div style={{ width: columnWidths.issueDate }}>
                      Issue Date
                    </div>
                  </ResizableBox>
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium cursor-pointer"
                  onClick={() => handleSort("hoursSpent")}
                >
                  <ResizableBox
                    width={columnWidths.hoursSpent}
                    height={0}
                    axis="x"
                    resizeHandles={["e"]}
                    onResizeStop={(_e: any, data: ResizeCallbackData) =>
                      handleResize("hoursSpent", data.size.width)
                    }
                  >
                    <div style={{ width: columnWidths.hoursSpent }}>
                      Hours Spent
                    </div>
                  </ResizableBox>
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium cursor-pointer"
                  onClick={() => handleSort("project")}
                >
                  <ResizableBox
                    width={columnWidths.project}
                    height={0}
                    axis="x"
                    resizeHandles={["e"]}
                    onResizeStop={(e: any, data: ResizeCallbackData) =>
                      handleResize("project", data.size.width)
                    }
                  >
                    <div style={{ width: columnWidths.project }}>Project</div>
                  </ResizableBox>
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium cursor-pointer"
                  onClick={() => handleSort("difficulty")}
                >
                  <ResizableBox
                    width={columnWidths.difficulty}
                    height={0}
                    axis="x"
                    resizeHandles={["e"]}
                    onResizeStop={(_e: any, data: ResizeCallbackData) =>
                      handleResize("difficulty", data.size.width)
                    }
                  >
                    <div style={{ width: columnWidths.difficulty }}>
                      Difficulty
                    </div>
                  </ResizableBox>
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedTasks.map((task) => (
                <SortableRow
                  key={task?.id}
                  task={task}
                  onEditClick={onEditClick}
                  onDeleteClick={onDeleteClick}
                />
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default DesktopViewTable;
