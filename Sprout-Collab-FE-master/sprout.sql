-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: sprout_collab_db
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collaboration_members`
--

DROP TABLE IF EXISTS `collaboration_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collaboration_members` (
  `user_id` varchar(60) NOT NULL,
  `collaboration_id` varchar(60) NOT NULL,
  `role` enum('admin','member') NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `collaboration_id` (`collaboration_id`),
  CONSTRAINT `collaboration_members_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `collaboration_members_ibfk_2` FOREIGN KEY (`collaboration_id`) REFERENCES `collaborations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collaboration_members`
--

LOCK TABLES `collaboration_members` WRITE;
/*!40000 ALTER TABLE `collaboration_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `collaboration_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collaborations`
--

DROP TABLE IF EXISTS `collaborations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collaborations` (
  `name` varchar(60) DEFAULT NULL,
  `admin_id` varchar(60) NOT NULL,
  `goal_id` varchar(60) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `goal_id` (`goal_id`),
  CONSTRAINT `collaborations_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`),
  CONSTRAINT `collaborations_ibfk_2` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collaborations`
--

LOCK TABLES `collaborations` WRITE;
/*!40000 ALTER TABLE `collaborations` DISABLE KEYS */;
INSERT INTO `collaborations` VALUES ('Collab7','771b52fb-50d7-4ac9-8db7-c4a95eae973b','46d5f9fd-ede8-4319-95bf-abbf41c7ca23','The Collaboration Collab7',1,'045577b3-2542-4b5c-8611-246f86a3d765','2024-06-25 02:18:35','2024-06-25 02:18:35'),('Collab9','a563894e-da96-4aaa-815f-a5ba78b66559','678015a2-a568-47b7-8abe-c47e79b1d2b4','The Collaboration Collab9',1,'0bc4f126-bda0-4f09-951f-0042268fe49a','2024-06-25 02:18:35','2024-06-25 02:18:35'),('Collab12','bd1847ac-d3e4-476b-8dbc-d70ff9000cba','869ec40f-2f35-455a-9f0c-460fb1072e26','The Collaboration Collab12',0,'235b5f27-e177-4b3b-bc0f-cebf72848f82','2024-06-25 02:18:35','2024-06-25 02:18:35'),('Collab6','5a067a86-5036-4c81-97fc-837b93ad408f','3acb8890-1e78-4aa0-8237-e4302e791cca','The Collaboration Collab6',0,'3a840d02-aaa1-4c22-88ce-8ac3c29143c5','2024-06-25 02:18:35','2024-06-25 02:18:35'),('Collab5','2dbb2aa0-02c7-4609-b39a-e6948a3e68fc','35b29e84-54e6-4ddc-a8f0-7d1f45b71fdb','The Collaboration Collab5',1,'76ec2b6f-dcea-4afd-944c-bb8329865172','2024-06-25 02:18:35','2024-06-25 02:18:35'),('Collab8','839b990e-ee7c-4f71-8730-860e9f2aff11','612abd0d-aeaa-493b-9fc2-32f7403a4e11','The Collaboration Collab8',0,'8546a660-804a-4b40-a70d-8d0fce3acbc9','2024-06-25 02:18:35','2024-06-25 02:18:35'),('Collab2','2d15651a-ce92-4593-a005-2ece6f50809f','29f577e4-783b-45b5-89da-fd68514fd885','The Collaboration Collab2',0,'89aa9c6f-65ea-48cf-b52a-338d9e351a6d','2024-06-25 02:17:38','2024-06-25 02:17:38'),('Collab10','b3ef50fe-9a63-496b-b0bd-22ffbb000380','7a838c6e-fd5d-4863-b4b1-c4ac959ae263','The Collaboration Collab10',0,'a6266f33-ec9c-4baa-9c2c-1e781b5ff696','2024-06-25 02:18:35','2024-06-25 02:18:35'),('Collab3','0238b00b-af13-4eb7-9a29-e3e79de0e8a0','23f83ca6-11d6-48fa-915a-9dbad7f60a4c','The Collaboration Collab3',1,'c557e2c9-a57c-49c9-a642-94bab57c0c95','2024-06-25 02:18:35','2024-06-25 02:18:35'),('Collab4','2d15651a-ce92-4593-a005-2ece6f50809f','29f577e4-783b-45b5-89da-fd68514fd885','The Collaboration Collab4',0,'e45b76ab-0573-4b72-9a80-c4cb7ecb63cb','2024-06-25 02:18:35','2024-06-25 02:18:35'),('Collab11','b917dbf6-c89c-404e-bcd6-2d2e44d2dd71','8669637d-6538-44ae-a288-fd798042a917','The Collaboration Collab11',1,'f451d78e-3fb8-4cb8-9fa2-f560411fab87','2024-06-25 02:18:35','2024-06-25 02:18:35');
/*!40000 ALTER TABLE `collaborations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goal_members`
--

DROP TABLE IF EXISTS `goal_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goal_members` (
  `user_id` varchar(60) NOT NULL,
  `goal_id` varchar(60) NOT NULL,
  `collab_id` varchar(60) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `goal_id` (`goal_id`),
  KEY `collab_id` (`collab_id`),
  CONSTRAINT `goal_members_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `goal_members_ibfk_2` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`id`),
  CONSTRAINT `goal_members_ibfk_3` FOREIGN KEY (`collab_id`) REFERENCES `collaborations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goal_members`
--

LOCK TABLES `goal_members` WRITE;
/*!40000 ALTER TABLE `goal_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `goal_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goal_types`
--

DROP TABLE IF EXISTS `goal_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goal_types` (
  `name` varchar(128) NOT NULL,
  `description` varchar(128) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goal_types`
--

LOCK TABLES `goal_types` WRITE;
/*!40000 ALTER TABLE `goal_types` DISABLE KEYS */;
INSERT INTO `goal_types` VALUES ('Relaxation1','Goals related to Relaxation1','030d61df-edfe-47fe-a29d-57fbb258da4f','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Travel','Goals related to Travel','22eab3a0-99ee-4367-9707-a4c544cd6bc0','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Family','Goals related to Family','3168f3a4-313e-4efb-a820-c06002fef06e','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Environmental','Goals related to Environmental','384f587e-4625-4db2-9a4e-a2f70c82939c','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Professional','Goals related to Professional','3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Health & Fitness','Goals related to Health & Fitness','3dcb59e5-d4c1-42c3-8f11-815d4744c3fb','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Education','Goals related to Education','4413cddf-abaa-4561-ad19-238b2ff4c79c','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Spiritual','Goals related to Spiritual','44bca959-4f7e-45bd-9d38-6244192a2f6f','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Career Development','Goals related to Career Development','53cfda34-13fb-4e13-bef0-dffc445b0d5d','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Financial','Goals related to Financial','7e1121a5-7eda-41a0-8115-8184d6d5c951','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Productivity','Goals related to Productivity','81b1dc87-cd17-43d9-b0f3-606e1654f317','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Relationships','Goals related to Relationships','a578256a-8277-441c-aec2-8f1833d8277b','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Learning','Goals related to Learning','b8bea7db-161d-45c6-88b1-45cc6d517aa4','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Wellbeing','Goals related to Wellbeing','c3658087-0d15-4f8d-aa6e-25c1783bec17','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Social Justice','Goals related to Social Justice','cfc0f55c-c764-4cf2-a356-a86f176bf4f0','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Personal','Goals related to Personal','d940575e-539a-496c-86e5-052b8de48eff','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Adventure','Goals related to Adventure','dcaafd1c-75fa-4184-bb2c-1cc566e71fcb','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Creative','Goals related to Creative','f8648fcb-670f-4363-b75a-dc47db9eeaaa','2024-06-25 01:50:17','2024-06-25 01:50:17'),('Community','Goals related to Community','f9b8c957-3a66-4032-bba6-7c7d9eb822c1','2024-06-25 01:50:17','2024-06-25 01:50:17');
/*!40000 ALTER TABLE `goal_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goals` (
  `name` varchar(128) NOT NULL,
  `description` varchar(128) NOT NULL,
  `target_completion_date` datetime DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL,
  `type` varchar(60) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  CONSTRAINT `goals_ibfk_1` FOREIGN KEY (`type`) REFERENCES `goal_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goals`
--

LOCK TABLES `goals` WRITE;
/*!40000 ALTER TABLE `goals` DISABLE KEYS */;
INSERT INTO `goals` VALUES ('Sample Goal 9','This is a sample goal description for goal 9','2024-08-09 00:00:00',1,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','23f83ca6-11d6-48fa-915a-9dbad7f60a4c','2024-06-25 02:08:34','2024-06-25 02:08:34'),('Sample Goal 7','This is a sample goal description for goal 7','2024-08-07 00:00:00',1,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','29f577e4-783b-45b5-89da-fd68514fd885','2024-06-25 02:08:34','2024-06-25 02:08:34'),('Sample Goal 8','This is a sample goal description for goal 8','2024-08-08 00:00:00',0,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','35b29e84-54e6-4ddc-a8f0-7d1f45b71fdb','2024-06-25 02:08:34','2024-06-25 02:08:34'),('Sample Goal 3','This is a sample goal description for goal 3','2024-08-03 00:00:00',1,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','3acb8890-1e78-4aa0-8237-e4302e791cca','2024-06-25 02:08:34','2024-06-25 02:08:34'),('Sample Goal 5','This is a sample goal description for goal 5','2024-08-05 00:00:00',1,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','46d5f9fd-ede8-4319-95bf-abbf41c7ca23','2024-06-25 02:09:08','2024-06-25 02:09:08'),('Sample Goal 3','This is a sample goal description for goal 3','2024-08-03 00:00:00',1,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','612abd0d-aeaa-493b-9fc2-32f7403a4e11','2024-06-25 02:09:08','2024-06-25 02:09:08'),('Sample Goal 10','This is a sample goal description for goal 10','2024-08-10 00:00:00',0,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','678015a2-a568-47b7-8abe-c47e79b1d2b4','2024-06-25 02:08:34','2024-06-25 02:08:34'),('Sample Goal 6','This is a sample goal description for goal 6','2024-08-06 00:00:00',0,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','7a838c6e-fd5d-4863-b4b1-c4ac959ae263','2024-06-25 02:08:34','2024-06-25 02:08:34'),('Sample Goal 2','This is a sample goal description for goal 2','2024-08-02 00:00:00',0,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','8669637d-6538-44ae-a288-fd798042a917','2024-06-25 02:09:08','2024-06-25 02:09:08'),('Sample Goal 7','This is a sample goal description for goal 7','2024-08-07 00:00:00',1,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','869ec40f-2f35-455a-9f0c-460fb1072e26','2024-06-25 02:09:08','2024-06-25 02:09:08'),('Sample Goal 1','This is a sample goal description for goal 1','2024-08-01 00:00:00',1,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','89f0985c-c1e6-46e7-a3ff-ed1bc7cf0bc9','2024-06-25 02:09:08','2024-06-25 02:09:08'),('Sample Goal 10','This is a sample goal description for goal 10','2024-08-10 00:00:00',0,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','bf79df75-8091-4037-b9d9-80c4adb34648','2024-06-25 02:09:08','2024-06-25 02:09:08'),('Sample Goal 8','This is a sample goal description for goal 8','2024-08-08 00:00:00',0,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','c33b1cc8-4dd7-4fe1-9001-8ca8af25ca89','2024-06-25 02:09:08','2024-06-25 02:09:08'),('Sample Goal 5','This is a sample goal description for goal 5','2024-08-05 00:00:00',1,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','c35787ce-50cf-4fdb-908c-fedc00d6b8ed','2024-06-25 02:08:34','2024-06-25 02:08:34'),('Sample Goal 4','This is a sample goal description for goal 4','2024-08-04 00:00:00',0,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','c53a1d7d-9b75-451f-8665-4b1cb9706fa0','2024-06-25 02:09:08','2024-06-25 02:09:08'),('Sample Goal 9','This is a sample goal description for goal 9','2024-08-09 00:00:00',1,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','df19da85-75e9-4db2-9fe9-7dc1cdf06d4c','2024-06-25 02:09:08','2024-06-25 02:09:08'),('Sample Goal 1','This is a sample goal description for goal 1','2024-08-01 00:00:00',1,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','ef7d77f4-2c07-4af5-a861-eb89cc94fc94','2024-06-25 02:08:34','2024-06-25 02:08:34'),('Sample Goal 6','This is a sample goal description for goal 6','2024-08-06 00:00:00',0,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','f37c5773-cb1b-42f7-b2b3-775088923ee7','2024-06-25 02:09:08','2024-06-25 02:09:08'),('Sample Goal 2','This is a sample goal description for goal 2','2024-08-02 00:00:00',0,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','f7fc261e-5c81-42ab-b967-03cfb8295669','2024-06-25 02:08:34','2024-06-25 02:08:34'),('Sample Goal 4','This is a sample goal description for goal 4','2024-08-04 00:00:00',0,'3cc268fd-fc21-4fab-b2d6-1d0a70a0da19','fc46f991-5732-4b6f-89f1-a155918354b0','2024-06-25 02:08:34','2024-06-25 02:08:34');
/*!40000 ALTER TABLE `goals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_members`
--

DROP TABLE IF EXISTS `project_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_members` (
  `project_id` varchar(60) NOT NULL,
  `user_id` varchar(60) NOT NULL,
  `goal_id` varchar(60) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `user_id` (`user_id`),
  KEY `goal_id` (`goal_id`),
  CONSTRAINT `project_members_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `project_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `project_members_ibfk_3` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_members`
--

LOCK TABLES `project_members` WRITE;
/*!40000 ALTER TABLE `project_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `goal_id` varchar(128) NOT NULL,
  `collab_id` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` varchar(128) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('pending','started','done','paused') NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `goal_id` (`goal_id`),
  KEY `collab_id` (`collab_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`id`),
  CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`collab_id`) REFERENCES `collaborations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('23f83ca6-11d6-48fa-915a-9dbad7f60a4c','045577b3-2542-4b5c-8611-246f86a3d765','Sample Project 1','This is a sample project description for project 1','2024-07-01','2024-08-01','pending','11364251-e30f-4d9d-a608-d1d128b8bdab','2024-06-25 04:04:38','2024-06-25 04:04:38'),('29f577e4-783b-45b5-89da-fd68514fd885','0bc4f126-bda0-4f09-951f-0042268fe49a','Sample Project 2','This is a sample project description for project 2','2024-07-02','2024-08-02','pending','1aafc6ed-e43a-4e68-aaf2-540db9f70056','2024-06-25 04:04:38','2024-06-25 04:04:38'),('3acb8890-1e78-4aa0-8237-e4302e791cca','3a840d02-aaa1-4c22-88ce-8ac3c29143c5','Sample Project 2854','This is a sample project description for project 28455','2024-07-04','2024-08-04','done','2080ead7-6af8-4b08-a9d5-4b7e11d635e7','2024-06-25 04:04:38','2024-06-25 04:04:38'),('8669637d-6538-44ae-a288-fd798042a917','a6266f33-ec9c-4baa-9c2c-1e781b5ff696','Sample Project 9','This is a sample project description for project 9','2024-07-09','2024-08-09','pending','56bb2087-8267-4386-9409-4fdfa1882416','2024-06-25 04:04:38','2024-06-25 04:04:38'),('46d5f9fd-ede8-4319-95bf-abbf41c7ca23','76ec2b6f-dcea-4afd-944c-bb8329865172','Sample Project 5','This is a sample project description for project 5','2024-07-05','2024-08-05','pending','9991129f-add4-45c5-886e-9000ffa370e2','2024-06-25 04:04:38','2024-06-25 04:04:38'),('35b29e84-54e6-4ddc-a8f0-7d1f45b71fdb','235b5f27-e177-4b3b-bc0f-cebf72848f82','Sample Project 3','This is a sample project description for project 3','2024-07-03','2024-08-03','pending','9b582f1d-960e-4767-816f-ad0f9b89d8d5','2024-06-25 04:04:38','2024-06-25 04:04:38'),('678015a2-a568-47b7-8abe-c47e79b1d2b4','89aa9c6f-65ea-48cf-b52a-338d9e351a6d','Sample Project 7','This is a sample project description for project 7','2024-07-07','2024-08-07','pending','adb6b6d5-aa5d-4eb5-bd5c-afdd8c0fda4f','2024-06-25 04:04:38','2024-06-25 04:04:38'),('869ec40f-2f35-455a-9f0c-460fb1072e26','c557e2c9-a57c-49c9-a642-94bab57c0c95','Sample Project 10','This is a sample project description for project 10','2024-07-10','2024-08-10','pending','e04cec12-feb8-4351-b2cf-fa8ceec84172','2024-06-25 04:04:38','2024-06-25 04:04:38'),('612abd0d-aeaa-493b-9fc2-32f7403a4e11','8546a660-804a-4b40-a70d-8d0fce3acbc9','Sample Project 6','This is a sample project description for project 6','2024-07-06','2024-08-06','pending','f20ab0ad-14d6-46ec-89d6-a2322f2b811d','2024-06-25 04:04:38','2024-06-25 04:04:38');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resources` (
  `collaboration_id` varchar(60) NOT NULL,
  `name` varchar(128) NOT NULL,
  `url` varchar(250) NOT NULL,
  `visible` tinyint(1) NOT NULL,
  `uploader` varchar(60) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `collaboration_id` (`collaboration_id`),
  KEY `uploader` (`uploader`),
  CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`collaboration_id`) REFERENCES `collaborations` (`id`),
  CONSTRAINT `resources_ibfk_2` FOREIGN KEY (`uploader`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES ('8546a660-804a-4b40-a70d-8d0fce3acbc9','Sample Resource 6','http://the_for_5',0,'839b990e-ee7c-4f71-8730-860e9f2aff11','318de806-abdd-40de-bf81-747aa983463f','2024-06-26 00:56:35','2024-06-26 00:56:35'),('89aa9c6f-65ea-48cf-b52a-338d9e351a6d','Sample Resource 7','http://the_for_6',1,'a563894e-da96-4aaa-815f-a5ba78b66559','393fec15-57bb-4e44-966d-f530a8a0bbb5','2024-06-26 00:56:35','2024-06-26 00:56:35'),('235b5f27-e177-4b3b-bc0f-cebf72848f82','Sample Resource 3','http://the_for_2',1,'2dbb2aa0-02c7-4609-b39a-e6948a3e68fc','601e6e3d-8e85-486b-a062-f405a709a0a5','2024-06-26 00:56:35','2024-06-26 00:56:35'),('c557e2c9-a57c-49c9-a642-94bab57c0c95','Sample Resource 9','http://the_for_8',1,'b917dbf6-c89c-404e-bcd6-2d2e44d2dd71','631c5577-a5d0-42e1-9c42-5b7ecee827e7','2024-06-26 00:56:35','2024-06-26 00:56:35'),('e45b76ab-0573-4b72-9a80-c4cb7ecb63cb','Sample Resource 11','http://the_for_9',1,'2dbb2aa0-02c7-4609-b39a-e6948a3e68fc','64c8837b-f7e5-40ed-a2da-badde5a5ea61','2024-06-26 12:07:11','2024-06-26 12:07:11'),('0bc4f126-bda0-4f09-951f-0042268fe49a','Sample Resource 2','http://the_for_1',0,'2d15651a-ce92-4593-a005-2ece6f50809f','74eb11a0-b8cc-4012-b898-f93617941ab0','2024-06-26 00:56:35','2024-06-26 00:56:35'),('e45b76ab-0573-4b72-9a80-c4cb7ecb63cb','Sample Resource 10','http://the_for_9',0,'bd1847ac-d3e4-476b-8dbc-d70ff9000cba','84a16925-7977-48b8-8ba6-196c8e41de97','2024-06-26 00:56:35','2024-06-26 00:56:35'),('c557e2c9-a57c-49c9-a642-94bab57c0c95','the file from ellis2','https://ahshjfffndhh,fhjabhaklsjhbjl',1,'2dbb2aa0-02c7-4609-b39a-e6948a3e68fc','899e4d99-f332-4560-a15f-e179c77d895c','2024-06-26 11:52:09','2024-06-26 11:52:09'),('a6266f33-ec9c-4baa-9c2c-1e781b5ff696','Sample Resource 8','http://the_for_7',0,'b3ef50fe-9a63-496b-b0bd-22ffbb000380','98e7ef36-24c5-41ac-a1da-9642b77843f8','2024-06-26 00:56:35','2024-06-26 00:56:35'),('76ec2b6f-dcea-4afd-944c-bb8329865172','Sample Resource 5','http://the_for_4',1,'771b52fb-50d7-4ac9-8db7-c4a95eae973b','cfdea975-6a06-4515-bd80-f04338864050','2024-06-26 00:56:35','2024-06-26 00:56:35'),('045577b3-2542-4b5c-8611-246f86a3d765','Sample Resource 1','http://the_for_0',1,'0238b00b-af13-4eb7-9a29-e3e79de0e8a0','dd5c3537-d18b-4d1c-b9a1-41829a46916f','2024-06-26 00:56:35','2024-06-26 00:56:35'),('3a840d02-aaa1-4c22-88ce-8ac3c29143c5','Sample Resource 4','http://the_for_3',0,'5a067a86-5036-4c81-97fc-837b93ad408f','f7b98bcf-fcd4-4393-b2c7-6fe9b90217fb','2024-06-26 00:56:35','2024-06-26 00:56:35');
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_members`
--

DROP TABLE IF EXISTS `task_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_members` (
  `project_id` varchar(60) NOT NULL,
  `task_id` varchar(60) NOT NULL,
  `user_id` varchar(60) NOT NULL,
  `status` enum('pending','started','done','paused') NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `no_of_approvals` int DEFAULT NULL,
  `is_approved` tinyint(1) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `task_id` (`task_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `task_members_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `task_members_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  CONSTRAINT `task_members_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_members`
--

LOCK TABLES `task_members` WRITE;
/*!40000 ALTER TABLE `task_members` DISABLE KEYS */;
INSERT INTO `task_members` VALUES ('9b582f1d-960e-4767-816f-ad0f9b89d8d5','5167d0ee-40d3-4355-bffe-186adbaa3bd4','2d15651a-ce92-4593-a005-2ece6f50809f','done',NULL,NULL,0,0,'015a6ed0-f0cc-4f7e-98ba-4cb304675eec','2024-06-26 14:10:45','2024-06-26 14:10:45'),('11364251-e30f-4d9d-a608-d1d128b8bdab','04881302-3618-4960-b365-87fb245a62b8','0238b00b-af13-4eb7-9a29-e3e79de0e8a0','pending',NULL,NULL,0,0,'2a709453-89dc-4e69-ae5b-942f968f7e7d','2024-06-26 13:38:14','2024-06-26 13:38:14'),('9b582f1d-960e-4767-816f-ad0f9b89d8d5','93900528-5d61-43d5-8d60-1594bcf972ff','839b990e-ee7c-4f71-8730-860e9f2aff11','pending',NULL,NULL,0,0,'2c586e35-1374-49eb-bb66-aadfa380e197','2024-06-26 13:38:14','2024-06-26 13:38:14'),('9991129f-add4-45c5-886e-9000ffa370e2','73be3dbc-8d05-4a53-8184-580a466f7009','771b52fb-50d7-4ac9-8db7-c4a95eae973b','pending',NULL,NULL,0,0,'4e39f2b6-467f-48f2-abb6-b3cedfff68b4','2024-06-26 13:38:14','2024-06-26 13:38:14'),('56bb2087-8267-4386-9409-4fdfa1882416','62f46024-c6f4-4597-be9e-0ec558490bf3','5a067a86-5036-4c81-97fc-837b93ad408f','pending',NULL,NULL,0,0,'753d9d1f-e7b6-4e28-abda-ddac8c9cb112','2024-06-26 13:38:14','2024-06-26 13:38:14'),('1aafc6ed-e43a-4e68-aaf2-540db9f70056','1bf1ce49-4c3c-4a54-b1cc-0014aaf5ffd4','2d15651a-ce92-4593-a005-2ece6f50809f','pending',NULL,NULL,0,0,'a0701481-69ff-43df-9591-f43a8945a6db','2024-06-26 13:38:14','2024-06-26 13:38:14'),('f20ab0ad-14d6-46ec-89d6-a2322f2b811d','edf1d35d-5374-43c5-8edf-0e6a0fc08696','b917dbf6-c89c-404e-bcd6-2d2e44d2dd71','pending',NULL,NULL,0,0,'e4b686ab-a492-4d52-824a-c70cb39562cb','2024-06-26 13:38:14','2024-06-26 13:38:14');
/*!40000 ALTER TABLE `task_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `goal_id` varchar(128) NOT NULL,
  `project_id` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` varchar(128) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('pending','started','done','paused') NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `goal_id` (`goal_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`id`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES ('35b29e84-54e6-4ddc-a8f0-7d1f45b71fdb','2080ead7-6af8-4b08-a9d5-4b7e11d635e7','the name for task - 2','the description for task - 2','2024-07-03','2024-08-03','pending','04881302-3618-4960-b365-87fb245a62b8','2024-06-26 12:53:26','2024-06-26 12:53:26'),('46d5f9fd-ede8-4319-95bf-abbf41c7ca23','9991129f-add4-45c5-886e-9000ffa370e2','the name for task - 4','the description for task - 4','2024-07-05','2024-08-05','pending','1bf1ce49-4c3c-4a54-b1cc-0014aaf5ffd4','2024-06-26 12:53:26','2024-06-26 12:53:26'),('612abd0d-aeaa-493b-9fc2-32f7403a4e11','9b582f1d-960e-4767-816f-ad0f9b89d8d5','the name for task - 5','the description for task - 5','2024-07-06','2024-08-06','pending','5167d0ee-40d3-4355-bffe-186adbaa3bd4','2024-06-26 12:53:26','2024-06-26 12:53:26'),('29f577e4-783b-45b5-89da-fd68514fd885','1aafc6ed-e43a-4e68-aaf2-540db9f70056','the name for task - 1','the description for task - 1','2024-07-02','2024-08-02','pending','62f46024-c6f4-4597-be9e-0ec558490bf3','2024-06-26 12:53:26','2024-06-26 12:53:26'),('8669637d-6538-44ae-a288-fd798042a917','f20ab0ad-14d6-46ec-89d6-a2322f2b811d','the name for task - 8','the description for task - 8','2024-07-09','2024-08-09','pending','73be3dbc-8d05-4a53-8184-580a466f7009','2024-06-26 12:53:26','2024-06-26 12:53:26'),('678015a2-a568-47b7-8abe-c47e79b1d2b4','adb6b6d5-aa5d-4eb5-bd5c-afdd8c0fda4f','the name for task - 6','the description for task - 6','2024-07-07','2024-08-07','pending','93900528-5d61-43d5-8d60-1594bcf972ff','2024-06-26 12:53:26','2024-06-26 12:53:26'),('3acb8890-1e78-4aa0-8237-e4302e791cca','56bb2087-8267-4386-9409-4fdfa1882416','the name for task - 3','the description for task - 3','2024-07-04','2024-08-04','pending','edf1d35d-5374-43c5-8edf-0e6a0fc08696','2024-06-26 12:53:26','2024-06-26 12:53:26'),('7a838c6e-fd5d-4863-b4b1-c4ac959ae263','e04cec12-feb8-4351-b2cf-fa8ceec84172','the name for task - 7','the description for task - 7','2024-07-08','2024-08-08','pending','f7c1744c-1cf8-440a-9306-86c9f83483fc','2024-06-26 12:53:26','2024-06-26 12:53:26');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `email` varchar(128) NOT NULL,
  `first_name` varchar(128) DEFAULT NULL,
  `last_name` varchar(128) DEFAULT NULL,
  `username` varchar(128) DEFAULT NULL,
  `password` varchar(128) NOT NULL,
  `skills` json DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_users_email` (`email`),
  UNIQUE KEY `ix_users_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('userNo.7@example.com','7FirstName','7LasttName','user No.7','$pbkdf2-sha256$29000$rlVqLaW01prznvM.x3jv3Q$Ut96TbOQTPdeDmJX58aaP8suMoXjDQIBeSRsIv/IbPk','[\"js\", \"debugging\", \"machine\", \"learning\"]','0238b00b-af13-4eb7-9a29-e3e79de0e8a0','2024-06-24 13:35:35','2024-06-24 13:35:36'),('userNo.13@example.com','13FirstName','13LasttName','user No.13','$pbkdf2-sha256$29000$EcLYu7dW6p1zrvWeU8q5Fw$FaeMn9v0.wVJBU7FGd/gZBpM/ZFhnoMqZEwalPE3wqw','[\"js\", \"debugging\", \"machine\", \"learning\"]','2d15651a-ce92-4593-a005-2ece6f50809f','2024-06-24 13:37:35','2024-06-24 13:37:35'),('userNo.8@example.com','8FirstName','8LasttName','user No.8','$pbkdf2-sha256$29000$KkWIMWYs5bzXute6V0pJyQ$zWycwZ/fo9bfiMIz9/G29nDldnptXRr8.FVgYuOfggQ','[\"js\", \"debugging\", \"machine\", \"learning\"]','2dbb2aa0-02c7-4609-b39a-e6948a3e68fc','2024-06-24 13:35:36','2024-06-24 13:35:36'),('userNo.16@example.com','16FirstName','16LasttName','user No.16','$pbkdf2-sha256$29000$/v9/D8E4B6AUIkQopZSSEg$V6.AyIrKkAODGTd.d1q3agu722nIXWouh/ZPfHPkdWI','[\"js\", \"debugging\", \"machine\", \"learning\"]','5a067a86-5036-4c81-97fc-837b93ad408f','2024-06-24 13:37:36','2024-06-24 13:37:36'),('userNo.2@example.com','2FirstName','2LasttName','user No.2','$pbkdf2-sha256$29000$aG2t9f7f29u797435jwHYA$Kx7fITsSaqEZ86SEpq.cFjxMnOl4WVT6MxkCoc2GPVk','[\"js\", \"debugging\", \"machine\", \"learning\"]','771b52fb-50d7-4ac9-8db7-c4a95eae973b','2024-06-24 13:35:35','2024-06-24 13:35:35'),('newuser@example.com','ellis','Ayikwei5','ellis','newpassword','[\"js\", \"debugging\", \"machine learning\", \"pyhton flask\", \"hacking nasa\", \"eatig alot\"]','839b990e-ee7c-4f71-8730-860e9f2aff11','2024-06-25 01:11:28','2024-06-25 01:11:28'),('userNo.15@example.com','15FirstName','15LasttName','user No.15','$pbkdf2-sha256$29000$.l.rFcJ4b815DyGEUMr5Pw$hrFp5ruZjHyH4lZ5B438H9X8d.QVZO/aydro8FxDM08','[\"js\", \"debugging\", \"machine\", \"learning\"]','a563894e-da96-4aaa-815f-a5ba78b66559','2024-06-24 13:37:36','2024-06-24 13:37:36'),('userNo.18@example.com','18FirstName','18LasttName','user No.18','$pbkdf2-sha256$29000$3TvnXEuJMaaUEmKMkbL23g$026eoSadSktU3INkwlDKtqGfZmhQocuEBA/bVYQBMXM','[\"js\", \"debugging\", \"machine\", \"learning\"]','b3ef50fe-9a63-496b-b0bd-22ffbb000380','2024-06-24 13:37:36','2024-06-24 13:37:36'),('userNo.6@example.com','6FirstName','6LasttName','user No.6','$pbkdf2-sha256$29000$xriXsjZmrNWaE.KcE0JojQ$Adx0bwIlDM9M6cQe5ckJhaDf0YZZToaYaX1F86nbBng','[\"js\", \"debugging\", \"machine\", \"learning\"]','b917dbf6-c89c-404e-bcd6-2d2e44d2dd71','2024-06-24 13:35:35','2024-06-24 13:35:35'),('userNo.1@example.com','1FirstName','1LasttName','user No.1','$pbkdf2-sha256$29000$F.Ico5QyJmTMuRdCqDWmFA$l63mkgMIEXLtCnD985uKD/jBmDcpELXwgk1goPjOpTI','[\"js\", \"debugging\", \"machine\", \"learning\"]','bd1847ac-d3e4-476b-8dbc-d70ff9000cba','2024-06-24 13:35:35','2024-06-24 13:35:35'),('userNo.3@example.com','3FirstName','3LasttName','user No.3','$pbkdf2-sha256$29000$FKK0lpLyvvceI8Q45/z/Hw$hVelx59dnNEqIcxsUawlLd9zU0cC/APnFbkwGmLKGtA','[\"js\", \"debugging\", \"machine\", \"learning\"]','cc11e84d-547e-4879-8eed-e26911722c34','2024-06-24 13:35:35','2024-06-24 13:35:35'),('userNo.10@example.com','10FirstName','10LasttName','user No.10','$pbkdf2-sha256$29000$kNIa4/wfA0DIubc2ZswZIw$Z/n7ASux6cgjk220ywOcZHaQofKV8h59Vs9tedAtOl4','[\"js\", \"debugging\", \"machine\", \"learning\"]','d0ecf168-07c7-4455-b511-c1c3c27296f2','2024-06-24 13:37:35','2024-06-24 13:37:35'),('userNo.12@example.com','12FirstName','12LasttName','user No.12','$pbkdf2-sha256$29000$K6U0Zsx5D.E8B.BcyzknRA$137RZ8TkmSAtcJKcJFfNMvUaD.j1khxbXxW1nqzwD5g','[\"js\", \"debugging\", \"machine\", \"learning\"]','d1c7cbf2-c8fb-4621-8250-de9e19b39914','2024-06-24 13:37:35','2024-06-24 13:37:35'),('userNo.14@example.com','14FirstName','14LasttName','user No.14','$pbkdf2-sha256$29000$EKIUgtAaQ0hJ6f2/l1IK4Q$a.KlYSuGU2Z0S9RJcrTyEy0V.BJVLNHp9t/viUyzpD8','[\"js\", \"debugging\", \"machine\", \"learning\"]','dcb21749-10be-4be7-b0af-c639af431905','2024-06-24 13:37:35','2024-06-24 13:37:36'),('userNo.11@example.com','11FirstName','11LasttName','user No.11','$pbkdf2-sha256$29000$FmIsJWRsLQXg/D/nvHfO2Q$UvwhAW/fF5An0yhO7uhBPSGkFWv.fdbMZlJm6GeFgrY','[\"js\", \"debugging\", \"machine\", \"learning\"]','dd6e8f78-e25f-4679-9f26-40552dc0da1f','2024-06-24 13:37:35','2024-06-24 13:37:35'),('userNo.9@example.com','9FirstName','9LasttName','user No.9','$pbkdf2-sha256$29000$qRVCCGHMuReCEIKwdu49Bw$L1lnK1MliB6TMsc.XFlDY3QyXJyJvzWbEPlWtIcuHCg','[\"js\", \"debugging\", \"machine\", \"learning\"]','efdc3cd7-e1d6-471b-bef7-d09e34559878','2024-06-24 13:35:36','2024-06-24 13:35:36'),('userNo.4@example.com','4FirstName','4LasttName','user No.4','$pbkdf2-sha256$29000$UWqtFUKodS7lPGcs5TzHuA$cbj8NFqPg1MBr5w1yrVwU28dCj1JpQu6Mr6bo7kvKV8','[\"js\", \"debugging\", \"machine\", \"learning\"]','f5bdd09f-6661-4fcf-9771-7b10f28b2ed2','2024-06-24 13:35:35','2024-06-24 13:35:35'),('userNo.5@example.com','5FirstName','5LasttName','user No.5','$pbkdf2-sha256$29000$I.R8T.nd2zuHEIIwhvCe0w$x4rDYeC9q.hq0lOLUNsXGOlxtCkQwUXVqx/r7qo.yPs','[\"js\", \"debugging\", \"machine\", \"learning\"]','fe48f2f6-d6bc-4978-9de3-33fa7987f71c','2024-06-24 13:35:35','2024-06-24 13:35:35');
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

-- Dump completed on 2024-06-27 16:33:08
