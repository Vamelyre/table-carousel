CREATE DATABASE TABLE_CAROUSEL;
USE TABLE_CAROUSEL;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(100) UNIQUE,
  role ENUM('this', 'role', 'type'),
  phone VARCHAR(20) UNIQUE,
  age INT,
  country VARCHAR(50)
);

INSERT INTO users (name, email, role, phone, age, country) VALUES
('name1', 'name1@gmail.com', 'this', '+995555111111', 11, 'Georgia'),
('person2', 'person2@gmail.com', 'role', '+995555999999', 32, 'Georgia'),
('3333', '33333@gmail.com', 'type', '+995555888787', 19, 'Georgia'),
('name4', 'name4@gmail.com', 'this', '+33612345678', 88, 'France'),
('name555', 'name55@gmail.com', 'role', '+995599888777', 22, 'Georgia'),
('name66', 'name6@gmail.com', 'type', '+39333111222', 15, 'Italy'),
('kephanolia', 'kephalonia@gmail.com', 'this', '+306912345678', 35, 'Greece'),
('celestia', 'ceestia@gmail.com', 'role', '+447911123456', 25, 'USA'),
('dorean', 'dorean@gmail.com', 'type', '+14165551234', 58, 'Ireland'),
('namme', 'namerrr@gmail.com', 'this', '+995577666555', 18, 'Georgia'),
('pinkie pie', 'pinkiepie@gmail.com', 'role', '+12025559876', 77, 'USA');
