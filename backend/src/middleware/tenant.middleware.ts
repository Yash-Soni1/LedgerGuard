
import type { RequestHandler } from "express";
import { getTenantConnection } from "../services/tenantConnection.service.js";
import { AppError } from "../utils/AppError.js";

export const requireTenantConnection: RequestHandler = async (
  _req,
  res,
  next
) => {
  const organizationId = res.locals.organizationId as
    | string
    | undefined;

  if (!organizationId) {
    throw new AppError(
      "Organization authorization required",
      403
    );
  }

  const tenantConnection =
    await getTenantConnection(organizationId);

  res.locals.tenantConnection = tenantConnection;

  next();
};
