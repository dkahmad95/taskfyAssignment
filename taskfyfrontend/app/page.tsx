"use client";
import { Button } from "./ui/sharedComponents/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import TaskModal from "./ui/sharedComponents/taskModal";
import CreateTaskForm from "./ui/forms/createTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "./lib/apiCalls";
import { Task } from "./lib/interfaces";
import { RootState } from "./lib/redux/store";
import { DataTableSkeleton } from "./ui/sharedComponents/tableSkelaton";
import Table from "./ui/table/table";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true);
    getTask(dispatch);
  }, [dispatch]);

  const taskRows: Task[] = useSelector((state: RootState) => state.task.Task);

  const taskIsLoading: boolean = useSelector(
    (state: RootState) => state.task.isFetching
  );
  const taskError: boolean = useSelector(
    (state: RootState) => state.task.error
  );
  if (!isClient) {
    return null; // Render nothing on the server since this component a full client side rendering
  }
  if (taskError) {
    return (
      <div className="flex justify-center items-center mt-16">
        <span className="text-red-500 text-2xl">
          Error while Fetching Tasks, please try again!
        </span>
      </div>
    );
  }

  return (
    <main className="w-full">
      <div className="flex flex-col w-full items-center justify-between gap-y-2 md:flex-row ">
        <h1 className="text-2xl font-medium">TASKFY</h1>
      </div>
      <div className="my-4 flex items-center justify-end gap-2 md:mt-8">
        {/* Create task modal */}
        <TaskModal
          open={open}
          setOpen={setOpen}
          Title={"Create Task"}
          FormComponent={CreateTaskForm}
        />
        {/* Add task Button */}
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setOpen(true);
          }}
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Add Task</span>
          <PlusIcon className="h-5 md:ml-4" />
        </Button>
      </div>
      {/* table of tasks */}
      {taskIsLoading ? <DataTableSkeleton /> : <Table taskRows={taskRows} />}
    </main>
  );
}
