CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` TEXT NOT NULL,
    `timestamp` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `users` ADD PRIMARY KEY `users_id_primary`(`id`);
CREATE TABLE `messages`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user` BIGINT NOT NULL,
    `message` TEXT NOT NULL,
    `room` TEXT NOT NULL,
    `timestamp` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `messages` ADD PRIMARY KEY `messages_id_primary`(`id`);
CREATE TABLE `groups`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `groupname` VARCHAR(255) NOT NULL,
    `room` TEXT NOT NULL,
    `admin` BIGINT NOT NULL,
    `timestamp` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `groups` ADD PRIMARY KEY `groups_id_primary`(`id`);
CREATE TABLE `friends`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user1` BIGINT NOT NULL,
    `user2` BIGINT NOT NULL,
    `room` TEXT NOT NULL,
    `timestamp` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `friends` ADD PRIMARY KEY `friends_id_primary`(`id`);
CREATE TABLE `group_messages`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user` BIGINT NOT NULL,
    `group` BIGINT NOT NULL,
    `timestamp` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `group_messages` ADD PRIMARY KEY `group_messages_id_primary`(`id`);
ALTER TABLE
    `groups` ADD CONSTRAINT `groups_admin_foreign` FOREIGN KEY(`admin`) REFERENCES `users`(`id`);
ALTER TABLE
    `messages` ADD CONSTRAINT `messages_user_foreign` FOREIGN KEY(`user`) REFERENCES `users`(`id`);
ALTER TABLE
    `friends` ADD CONSTRAINT `friends_user1_foreign` FOREIGN KEY(`user1`) REFERENCES `users`(`id`);
ALTER TABLE
    `friends` ADD CONSTRAINT `friends_user2_foreign` FOREIGN KEY(`user2`) REFERENCES `users`(`id`);
ALTER TABLE
    `group_messages` ADD CONSTRAINT `group_messages_user_foreign` FOREIGN KEY(`user`) REFERENCES `users`(`id`);
ALTER TABLE
    `group_messages` ADD CONSTRAINT `group_messages_group_foreign` FOREIGN KEY(`group`) REFERENCES `groups`(`id`);