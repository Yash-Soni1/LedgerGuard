
import type { Model, Schema } from "mongoose";

import { getTenantConnection } from "./tenantConnection.service.js";

export const getTenantModel = async <T>(
  organizationId: string,
  modelName: string,
  schema: Schema<T>,
  collectionName?: string
): Promise<Model<T>> => {
  if (!modelName.trim()) {
    throw new Error("Model name is required");
  }

  const connection = await getTenantConnection(organizationId);

  const existingModel = connection.models[modelName] as
    | Model<T>
    | undefined;

  if (existingModel) {
    return existingModel;
  }

  return connection.model<T>(
    modelName,
    schema,
    collectionName
  );
};
