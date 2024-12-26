import * as Yup from "yup";

export const createValidationSchema = Yup.object({
  taskName: Yup.string().required("Task name is required"),
  assignee: Yup.string().required("Assignee is required"),
  dueDate: Yup.date().required("Due date is required"),
  issueDate: Yup.date().required("Issue date is required"),
  hoursSpent: Yup.number()
    .typeError("Hours spent must be a number")
    .min(0, "Hours spent cannot be negative")
    .required("Hours spent is required"),
  project: Yup.string().required("Project is required"),
  difficulty: Yup.string()
    .oneOf(["easy", "medium", "hard"], "Invalid difficulty level")
    .required("Difficulty level is required"),
});

export const updateValidationSchema = Yup.object({
  taskName: Yup.string().required("Task name is required"),
  assignee: Yup.string().required("Assignee is required"),
  dueDate: Yup.date().required("Due date is required"),
  issueDate: Yup.date().required("Issue date is required"),
  hoursSpent: Yup.number()
    .typeError("Hours spent must be a number")
    .min(0, "Hours spent cannot be negative")
    .required("Hours spent is required"),
  project: Yup.string().required("Project is required"),
  difficulty: Yup.string()
    .oneOf(["easy", "medium", "hard"], "Invalid difficulty level")
    .required("Difficulty level is required"),
});
