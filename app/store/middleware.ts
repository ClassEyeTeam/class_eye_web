import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "~/hooks/use-toast";

/**
 * Log a warning and show a toast!
 */

interface RejectedAction {
  payload: {
    message?: string;
    status?: number;
    error?: string;
  };
  error?: {
    message?: string;
    data?: {
      message: string;
    };
  };
  meta?: {
    arg: any;
    requestId: string;
    rejectedWithValue: boolean;
  };
}

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.warn("We got a rejected action!");
      console.error(action);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: action.payload?.message || "An unknown error occurred",
      });
    }

    return next(action);
  };
