-- AlterTable
ALTER TABLE `users` ADD PRIMARY KEY (`username`);

-- CreateTable
CREATE TABLE `diagnosis` (
    `id` VARCHAR(191) NOT NULL,
    `answer` JSON NOT NULL,
    `scor` INTEGER NULL,
    `expired` INTEGER NOT NULL,
    `disease` VARCHAR(191) NULL,
    `status` ENUM('pending', 'cancel', 'finish') NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `username` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `diagnosis` ADD CONSTRAINT `diagnosis_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
