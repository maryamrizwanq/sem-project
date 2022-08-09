CREATE TABLE `life-care`.`appointments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `patient_name` VARCHAR(50) NOT NULL,
  `patient_email` VARCHAR(100) NOT NULL,
  `appointment_day` VARCHAR(45),
  `appointment_time` VARCHAR(45),
  `doc_id` INT NOT NULL,
  `patient_message` VARCHAR(200) NULL,
  `request_date` datetime not null default current_timestamp,
  PRIMARY KEY (`id`),
  foreign key (doc_id) references doctor(id));