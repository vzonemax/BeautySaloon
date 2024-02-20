CREATE DATABASE  IF NOT EXISTS `beautysaloon` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `beautysaloon`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: beautysaloon
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `role` int NOT NULL,
  `phoneNumber` varchar(45) NOT NULL,
  `userImage` varchar(300) DEFAULT 'http://localhost:5000/user-default-image.jpg',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vzonemax','111','Максим Бомбизов',2,'375295128657','http://localhost:5000/1704799675578-1.jpeg'),(2,'nailsirina','111','Ирина Маргелова',2,'375295887799','http://localhost:5000/nailsirina.jpg'),(3,'alicegray','111','Алиса Серая',1,'375295128667','http://localhost:5000/alice.jpg'),(4,'madonna','111','Анастасия Крош',1,'375295446886','http://localhost:5000/madon.jpg'),(5,'cryst','111','Кристина Рок',0,'375295448686','http://localhost:5000/cryst.jpg'),(23,'testuser','111','Aleksey Bloha',0,'375298855445','http://localhost:5000/user-default-image.jpg'),(24,'testuser2','111','Galina Blanca',0,'375298765115','http://localhost:5000/user-default-image.jpg'),(25,'testUser3','111','Test User',0,'375295554433','http://localhost:5000/user-default-image.jpg'),(26,'testUser4','111','Test User',0,'375295115544','http://localhost:5000/user-default-image.jpg'),(27,'testuser6','111','Test User',0,'375295128557','http://localhost:5000/user-default-image.jpg'),(28,'testUser29','111','Test ',0,'User','http://localhost:5000/user-default-image.jpg'),(29,'testUser31','111','Вася Пупкин',0,'375295128651','http://localhost:5000/user-default-image.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-20 20:46:57
