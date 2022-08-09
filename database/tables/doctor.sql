CREATE TABLE `life-care`.`doctor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50),
  `desc` VARCHAR(200),
  `pictureName` VARCHAR(65) NOT NULL,
  `designation` VARCHAR(65) NOT NULL,
  `fbLink` VARCHAR(65) NOT NULL,
  `twitterLink` VARCHAR(65) NOT NULL,
  `linkedInLink` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `picture_UNIQUE` (`pictureName` ASC) VISIBLE);