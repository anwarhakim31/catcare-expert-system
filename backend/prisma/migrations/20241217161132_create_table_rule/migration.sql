-- CreateTable
CREATE TABLE `rules` (
    `id` VARCHAR(191) NOT NULL,
    `diseaseId` VARCHAR(191) NOT NULL,
    `symptomId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `rules_diseaseId_symptomId_key`(`diseaseId`, `symptomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_diseaseId_fkey` FOREIGN KEY (`diseaseId`) REFERENCES `diseases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_symptomId_fkey` FOREIGN KEY (`symptomId`) REFERENCES `symptoms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
