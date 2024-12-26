import React, { useState } from "react";
import { useDispatch } from "react-redux";
import MobileViewTable from "./components/mobileView/MobileViewTable";
import DesktopViewTable from "./components/deskTopView/DesktopViewTable";
import { deleteTask } from "@/app/lib/apiCalls";
import { Task } from "@/app/lib/interfaces";
import BasicModal from "../sharedComponents/modal";
import TaskModal from "../sharedComponents/taskModal";
import UpdateTaskForm from "../forms/updateTaskForm";

interface TableProps {
  taskRows: Task[];
}

const Table = ({ taskRows }: TableProps) => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedEditTask, setSelectedEditTask] = useState<Task | null>(null);
  const [selectedDeleteTask, setSelectedDeleteTask] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleEditClick = (task: Task) => {
    setSelectedEditTask(task);
    setOpenEdit(true);
  };

  const handleDeleteClick = (taskName: string, taskId: number) => {
    setSelectedDeleteTask(taskName);
    setSelectedId(taskId);
    setOpenDelete(true);
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      deleteTask(dispatch, selectedId);
      setOpenDelete(false);
    }
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View Table */}
          <MobileViewTable
            taskRows={taskRows}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />

          {/* Desktop View Table */}
          <DesktopViewTable
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      </div>

      {/* Delete Modal */}
      {selectedDeleteTask && (
        <BasicModal
          open={openDelete}
          setOpen={setOpenDelete}
          Title={`Delete ${selectedDeleteTask}`}
          handleClick={handleDelete}
        />
      )}

      {/* Task Modal for Edit */}
      {selectedEditTask && (
        <TaskModal
          open={openEdit}
          setOpen={setOpenEdit}
          Title={`Edit ${selectedEditTask?.taskName}`}
          FormComponent={UpdateTaskForm}
          taskData={selectedEditTask}
        />
      )}
    </div>
  );
};

export default Table;
