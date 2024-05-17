-- CreateTable
CREATE TABLE "customers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "technicians" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "customer_id" INTEGER NOT NULL,
    "hardware_type" TEXT NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "assigned_technician_id" INTEGER,
    "date" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "tickets_assigned_technician_id_fkey" FOREIGN KEY ("assigned_technician_id") REFERENCES "technicians" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "tickets_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "tickets_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "warehouses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "pinpad_stock" INTEGER,
    "weight_stock" INTEGER,
    "scanner_stock" INTEGER,
    "biometric_reader_stock" INTEGER
);

-- CreateTable
CREATE TABLE "warehouses_new" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "pinpad_stock" INTEGER,
    "weight_stock" INTEGER,
    "scanner_stock" INTEGER,
    "biometric_reader_stock" INTEGER
);
