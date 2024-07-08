import { roles } from "../../middelware/auth.js";

export const endpoints = {
    create: [roles.Admin],
}