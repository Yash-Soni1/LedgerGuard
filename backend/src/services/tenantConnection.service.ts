
import "../config/dns.js";
import mongoose, { type Connection } from "mongoose";
import { env } from "../config/env.js";

const tenantConnections = new Map<string, Connection>();

const pendingConnections = new Map<string, Promise<Connection>>();

export const getTenantDatabaseName = (organizationId: string): string => {
  if (!mongoose.Types.ObjectId.isValid(organizationId)) {
    throw new Error("Invalid organization ID");
  }

  const normalizedId = new mongoose.Types.ObjectId(
    organizationId
  ).toString();

  return `lg_t_${normalizedId}`;
};

export const getTenantConnection = async (
  organizationId: string
): Promise<Connection> => {
  const databaseName = getTenantDatabaseName(organizationId);

  const existingConnection = tenantConnections.get(databaseName);

  if (existingConnection?.readyState === 1) {
    return existingConnection;
  }

  // Remove stale connections from the registry.
  if (existingConnection) {
    tenantConnections.delete(databaseName);
  }

  const pendingConnection = pendingConnections.get(databaseName);

  if (pendingConnection) {
    return pendingConnection;
  }

  const connectionPromise = (async (): Promise<Connection> => {
    const connection = mongoose.createConnection(env.MONGODB_URI, {
      dbName: databaseName,
      serverSelectionTimeoutMS: 10000,
    });

    try {
      await connection.asPromise();

      tenantConnections.set(databaseName, connection);

      const removeConnection = () => {
        if (tenantConnections.get(databaseName) === connection) {
          tenantConnections.delete(databaseName);
        }
      };

      connection.on("disconnected", removeConnection);
      connection.on("close", removeConnection);

      console.log(`Tenant database connected: ${databaseName}`);

      return connection;
    } catch (error: unknown) {
      await connection.close().catch(() => undefined);

      throw error;
    } finally {
      pendingConnections.delete(databaseName);
    }
  })();

  pendingConnections.set(databaseName, connectionPromise);

  return connectionPromise;
};

export const closeTenantConnection = async (
  organizationId: string
): Promise<void> => {
  const databaseName = getTenantDatabaseName(organizationId);

  const pendingConnection = pendingConnections.get(databaseName);

  if (pendingConnection) {
    await pendingConnection.catch(() => undefined);
  }

  const connection = tenantConnections.get(databaseName);

  if (!connection) {
    return;
  }

  tenantConnections.delete(databaseName);

  await connection.close();

  console.log(`Tenant database disconnected: ${databaseName}`);
};

export const closeAllTenantConnections = async (): Promise<void> => {
  await Promise.allSettled([...pendingConnections.values()]);

  const connections = [...tenantConnections.entries()];

  await Promise.all(
    connections.map(async ([databaseName, connection]) => {
      await connection.close();
      console.log(`Tenant database disconnected: ${databaseName}`);
    })
  );

  tenantConnections.clear();

  console.log("All tenant database connections closed.");
};
