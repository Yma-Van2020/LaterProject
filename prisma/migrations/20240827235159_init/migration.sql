-- CreateTable
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "original" TEXT NOT NULL,
    "parameters" TEXT NOT NULL,
    "newUrl" TEXT NOT NULL
);
