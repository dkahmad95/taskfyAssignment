import { Form, Formik } from "formik";
import React from "react";

import { useDispatch } from "react-redux";
import { updateValidationSchema } from "./validations";
import { getTask, updateTask } from "@/app/lib/apiCalls";
import { Task } from "@/app/lib/interfaces";
import { Input } from "../sharedComponents/input";
import { Select } from "../sharedComponents/select";
import { Button } from "../sharedComponents/button";

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

interface UpdateTaskFormProps {
  setOpen: (open: boolean) => void;
  taskData?: Task;
}

const UpdateTaskForm = ({ setOpen, taskData }: UpdateTaskFormProps) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        id: taskData?.id,
        taskName: taskData?.taskName || "",
        assignee: taskData?.assignee || "",
        dueDate: taskData?.dueDate || "",
        issueDate: taskData?.issueDate || "",
        hoursSpent: taskData?.hoursSpent || 0,
        project: taskData?.project || "",
        difficulty: taskData?.difficulty || "",
      }}
      validationSchema={updateValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("values", values);
        try {
          await updateTask(dispatch, values, taskData?.id);
          await getTask(dispatch);
          alert("Task updated successfully!");
          setOpen(false);
        } catch (error) {
          console.error("Error:", error);
          alert("Failed to create interfaces. Please try again.");
        } finally {
          setSubmitting(false);
        }
        console.log("values", values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form>
          <div className="flex flex-row gap-2">
            <div>
              {/* Task Name */}
              <div className="flex flex-col gap-2">
                <Input
                  id="taskName"
                  name="taskName"
                  label="Task Name"
                  placeholder="Enter task name"
                  type="text"
                  value={values.taskName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[300px]"
                />
                {errors.taskName && touched.taskName && (
                  <div className="text-red-500 text-xs">{errors.taskName}</div>
                )}
              </div>

              {/* Assignee */}
              <div className="flex flex-col gap-2">
                <Input
                  id="assignee"
                  name="assignee"
                  label="Assignee"
                  placeholder="Enter assignee name"
                  type="text"
                  value={values.assignee}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[300px]"
                />
                {errors.assignee && touched.assignee && (
                  <div className="text-red-500 text-xs">{errors.assignee}</div>
                )}
              </div>

              {/* Due Date */}
              <div className="flex flex-col gap-2">
                <Input
                  id="dueDate"
                  name="dueDate"
                  label="Due Date"
                  placeholder="Enter due date"
                  type="date"
                  value={values.dueDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[300px]"
                />
                {errors.dueDate && touched.dueDate && (
                  <div className="text-red-500 text-xs">{errors.dueDate}</div>
                )}
              </div>

              {/* Issue Date */}
              <div className="flex flex-col gap-2">
                <Input
                  id="issueDate"
                  name="issueDate"
                  label="Issue Date"
                  placeholder="Enter issue date"
                  type="date"
                  value={values.issueDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[300px]"
                />
                {errors.issueDate && touched.issueDate && (
                  <div className="text-red-500 text-xs">{errors.issueDate}</div>
                )}
              </div>
            </div>
            <div>
              {/* Hours Spent */}
              <div className="flex flex-col gap-2">
                <Input
                  id="hoursSpent"
                  name="hoursSpent"
                  label="Hours Spent"
                  placeholder="Enter hours spent"
                  type="number"
                  value={values.hoursSpent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[300px]"
                />
                {errors.hoursSpent && touched.hoursSpent && (
                  <div className="text-red-500 text-xs">
                    {errors.hoursSpent}
                  </div>
                )}
              </div>

              {/* Project */}
              <div className="flex flex-col gap-2">
                <Input
                  id="project"
                  name="project"
                  label="Project"
                  placeholder="Enter project name"
                  type="text"
                  value={values.project}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[300px]"
                />
                {errors.project && touched.project && (
                  <div className="text-red-500 text-xs">{errors.project}</div>
                )}
              </div>

              {/* Difficulty */}
              <div className="flex flex-col gap-2">
                <Select
                  id="difficulty"
                  label="Select Difficulty"
                  name="difficulty"
                  value={values.difficulty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={difficultyOptions}
                  className="w-[300px]"
                />
                {errors.difficulty && touched.difficulty && (
                  <div className="text-red-500 text-xs">
                    {errors.difficulty}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <Button
              onClick={() => setOpen(false)}
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-black transition-colors hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
              type="submit"
              disabled={isSubmitting}
            >
              Update
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateTaskForm;
