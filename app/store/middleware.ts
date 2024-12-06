import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "~/hooks/use-toast";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn("We got a rejected action!");
      console.error(action);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "data" in action.error
            ? (action.error.data as { message: string }).message
            : action.error.message,
      });
    }

    return next(action);
  };
