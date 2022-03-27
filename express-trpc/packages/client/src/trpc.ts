import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "api-server";

//exposes type definitions from api server into hooks
export const trpc = createReactQueryHooks<AppRouter>();
