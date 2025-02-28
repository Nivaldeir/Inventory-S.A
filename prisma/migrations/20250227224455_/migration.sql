/*
  Warnings:

  - You are about to drop the `ListControl` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ListControl";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MachineryMovement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" BOOLEAN NOT NULL,
    "machineryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "total_units" INTEGER NOT NULL,
    "available" INTEGER NOT NULL,
    "unavailable" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MachineryMovement_machineryId_fkey" FOREIGN KEY ("machineryId") REFERENCES "Machinery" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MachineryMovement" ("available", "createdAt", "destination", "id", "machineryId", "reason", "status", "timestamp", "total_units", "unavailable", "updatedAt", "userId") SELECT "available", "createdAt", "destination", "id", "machineryId", "reason", "status", "timestamp", "total_units", "unavailable", "updatedAt", "userId" FROM "MachineryMovement";
DROP TABLE "MachineryMovement";
ALTER TABLE "new_MachineryMovement" RENAME TO "MachineryMovement";
CREATE TABLE "new_StockMovement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "stockId" TEXT NOT NULL,
    "locationStocked" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StockMovement_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StockMovement" ("createdAt", "id", "locationStocked", "quantity", "reason", "stockId", "timestamp", "type", "updatedAt", "userId") SELECT "createdAt", "id", "locationStocked", "quantity", "reason", "stockId", "timestamp", "type", "updatedAt", "userId" FROM "StockMovement";
DROP TABLE "StockMovement";
ALTER TABLE "new_StockMovement" RENAME TO "StockMovement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
