import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

import { ClockIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function DifficultyStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        {
          "bg-green-100 text-green-600": status === "easy",
          "bg-yellow-100 text-yellow-600": status === "medium",
          "bg-red-100 text-red-600": status === "hard",
        }
      )}
    >
      {status === "easy" && (
        <>
          Easy
          <CheckCircleIcon className="ml-1 w-4 h-4 text-green-600" />
        </>
      )}
      {status === "medium" && (
        <>
          Medium
          <ClockIcon className="ml-1 w-4 h-4 text-yellow-600" />
        </>
      )}
      {status === "hard" && (
        <>
          Hard
          <ExclamationCircleIcon className="ml-1 w-4 h-4 text-red-600" />
        </>
      )}
    </span>
  );
}
