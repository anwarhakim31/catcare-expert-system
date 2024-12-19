/*
  Warnings:

  - You are about to alter the column `disease` on the `diagnosis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `diagnosis` MODIFY `disease` JSON NULL;
