-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "minStock" REAL NOT NULL,
    "unitOfMeasurement" TEXT NOT NULL,
    "quantity" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Stock_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stock" ("categoryId", "createdAt", "description", "id", "minStock", "name", "price", "sku", "status", "unitOfMeasurement", "updatedAt") SELECT "categoryId", "createdAt", "description", "id", "minStock", "name", "price", "sku", "status", "unitOfMeasurement", "updatedAt" FROM "Stock";
DROP TABLE "Stock";
ALTER TABLE "new_Stock" RENAME TO "Stock";
CREATE UNIQUE INDEX "Stock_sku_key" ON "Stock"("sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
