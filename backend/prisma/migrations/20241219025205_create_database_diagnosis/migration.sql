/*
  Warnings:

  - You are about to drop the column `answer` on the `diagnosis` table. All the data in the column will be lost.
  - Added the required column `symptoms` to the `diagnosis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `diagnosis` DROP COLUMN `answer`,
    ADD COLUMN `symptoms` JSON NOT NULL;
