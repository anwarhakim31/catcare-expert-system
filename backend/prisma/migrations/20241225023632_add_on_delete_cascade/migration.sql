-- DropForeignKey
ALTER TABLE `diagnosis` DROP FOREIGN KEY `diagnosis_username_fkey`;

-- DropForeignKey
ALTER TABLE `rules` DROP FOREIGN KEY `rules_diseaseId_fkey`;

-- DropForeignKey
ALTER TABLE `rules` DROP FOREIGN KEY `rules_symptomId_fkey`;

-- AlterTable
ALTER TABLE `diagnosis` MODIFY `scor` INTEGER NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_diseaseId_fkey` FOREIGN KEY (`diseaseId`) REFERENCES `diseases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_symptomId_fkey` FOREIGN KEY (`symptomId`) REFERENCES `symptoms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnosis` ADD CONSTRAINT `diagnosis_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
