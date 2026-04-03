-- DMVV Bhartiy Mahila Shakti Foundation
-- Database Schema (MySQL)
-- Generated: 2025

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user','center','supervisor','transport','admin','hr') DEFAULT 'user',
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  is_verified TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- KYC
CREATE TABLE IF NOT EXISTS kycs (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  aadhaar_file_name VARCHAR(255),
  photo_file_name VARCHAR(255),
  address_proof_file_name VARCHAR(255),
  bank_name VARCHAR(200),
  account_number VARCHAR(50),
  ifsc_code VARCHAR(20),
  branch_name VARCHAR(200),
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  admin_remark TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Centers
CREATE TABLE IF NOT EXISTS centers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  address TEXT,
  state VARCHAR(100),
  district VARCHAR(100),
  block VARCHAR(100),
  contact_phone VARCHAR(20),
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- News Items
CREATE TABLE IF NOT EXISTS news_items (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  category VARCHAR(100),
  publish_date DATE,
  is_published TINYINT(1) DEFAULT 0,
  image_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- FAQ Items
CREATE TABLE IF NOT EXISTS faq_items (
  id VARCHAR(50) PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  site_title VARCHAR(300),
  tagline VARCHAR(500),
  footer_text TEXT,
  contact_email VARCHAR(200),
  contact_phone VARCHAR(20),
  address TEXT,
  logo_url VARCHAR(500),
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Gallery Items
CREATE TABLE IF NOT EXISTS gallery_items (
  id VARCHAR(50) PRIMARY KEY,
  src TEXT NOT NULL,
  category VARCHAR(100),
  caption VARCHAR(500),
  media_type ENUM('photo','video') DEFAULT 'photo',
  uploaded_at DATE
);

-- Training Programs
CREATE TABLE IF NOT EXISTS training_programs (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  duration VARCHAR(100),
  eligibility TEXT,
  certification VARCHAR(200),
  description TEXT,
  outcomes JSON,
  image VARCHAR(500),
  color VARCHAR(100),
  is_active TINYINT(1) DEFAULT 1
);

-- Company Profile
CREATE TABLE IF NOT EXISTS company_profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  org_name VARCHAR(300),
  description TEXT,
  registration_no VARCHAR(100),
  founding_year VARCHAR(10),
  website VARCHAR(300)
);

-- Leadership Members
CREATE TABLE IF NOT EXISTS leadership_members (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  designation VARCHAR(200),
  qualification VARCHAR(300),
  message TEXT,
  photo_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1
);

-- Foundation Events
CREATE TABLE IF NOT EXISTS foundation_events (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  event_date DATE,
  location VARCHAR(300),
  image_url VARCHAR(500),
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Computer Centers
CREATE TABLE IF NOT EXISTS computer_centers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(300) NOT NULL,
  address TEXT,
  state VARCHAR(100),
  district VARCHAR(100),
  facilities TEXT,
  contact_phone VARCHAR(20),
  image_url VARCHAR(500),
  is_active TINYINT(1) DEFAULT 1
);

-- Schemes
CREATE TABLE IF NOT EXISTS schemes (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(300) NOT NULL,
  ministry VARCHAR(300),
  description TEXT,
  eligibility JSON,
  benefits JSON,
  how_to_apply TEXT,
  color VARCHAR(100),
  featured TINYINT(1) DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0,
  image_url VARCHAR(500)
);

-- Loan Schemes
CREATE TABLE IF NOT EXISTS loan_schemes (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(300) NOT NULL,
  amount VARCHAR(100),
  interest VARCHAR(100),
  tenure VARCHAR(100),
  description TEXT,
  eligibility JSON,
  color VARCHAR(100),
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Employment Partners
CREATE TABLE IF NOT EXISTS employment_partners (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(300) NOT NULL,
  sector VARCHAR(200),
  openings INT DEFAULT 0,
  description TEXT,
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Success Stories
CREATE TABLE IF NOT EXISTS success_stories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  from_story VARCHAR(300),
  now_story VARCHAR(300),
  income VARCHAR(100),
  quote TEXT,
  image_url VARCHAR(500),
  is_active TINYINT(1) DEFAULT 1
);

-- Award Categories
CREATE TABLE IF NOT EXISTS award_categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  color VARCHAR(100),
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Award Winners
CREATE TABLE IF NOT EXISTS award_winners (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  district VARCHAR(100),
  category VARCHAR(200),
  achievement TEXT,
  year VARCHAR(10),
  image_url VARCHAR(500),
  is_active TINYINT(1) DEFAULT 1
);

-- Apply Form Submissions
CREATE TABLE IF NOT EXISTS apply_form_submissions (
  id VARCHAR(50) PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(200),
  mobile VARCHAR(20),
  state VARCHAR(100),
  district VARCHAR(100),
  message TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('new','contacted','enrolled','rejected') DEFAULT 'new'
);

-- Home Hero
CREATE TABLE IF NOT EXISTS home_hero (
  id INT PRIMARY KEY AUTO_INCREMENT,
  heading VARCHAR(500),
  subheading TEXT,
  primary_btn_text VARCHAR(100),
  secondary_btn_text VARCHAR(100)
);

-- Home Stats
CREATE TABLE IF NOT EXISTS home_stats (
  id VARCHAR(50) PRIMARY KEY,
  number_value VARCHAR(50),
  label VARCHAR(200),
  icon_name VARCHAR(50),
  color VARCHAR(100),
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Home Initiatives
CREATE TABLE IF NOT EXISTS home_initiatives (
  id VARCHAR(50) PRIMARY KEY,
  label VARCHAR(200),
  icon_name VARCHAR(50),
  color VARCHAR(100),
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Home Impact Stories
CREATE TABLE IF NOT EXISTS home_impact_stories (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(300),
  subtitle VARCHAR(300),
  image_url VARCHAR(500),
  bg_color VARCHAR(100),
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Home CTA
CREATE TABLE IF NOT EXISTS home_cta (
  id INT PRIMARY KEY AUTO_INCREMENT,
  heading VARCHAR(500),
  subtext TEXT,
  primary_btn_text VARCHAR(100),
  secondary_btn_text VARCHAR(100)
);

-- Community Centers
CREATE TABLE IF NOT EXISTS community_centers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(300) NOT NULL,
  address TEXT,
  state VARCHAR(100),
  district VARCHAR(100),
  services TEXT,
  contact_phone VARCHAR(20),
  image_url VARCHAR(500),
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Transport Info
CREATE TABLE IF NOT EXISTS transport_info (
  id VARCHAR(50) PRIMARY KEY,
  vehicle_type VARCHAR(200),
  route TEXT,
  capacity INT DEFAULT 0,
  contact_phone VARCHAR(20),
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Download Items
CREATE TABLE IF NOT EXISTS download_items (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  file_url VARCHAR(500),
  file_type VARCHAR(20),
  file_size VARCHAR(20),
  category VARCHAR(100),
  is_active TINYINT(1) DEFAULT 1,
  uploaded_at DATE,
  sort_order INT DEFAULT 0
);

-- Legal Documents
CREATE TABLE IF NOT EXISTS legal_documents (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  document_type VARCHAR(100),
  issued_by VARCHAR(300),
  issue_date DATE,
  valid_upto DATE,
  registration_no VARCHAR(100),
  description TEXT,
  document_url VARCHAR(500),
  image_url VARCHAR(500),
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Wishes Letters
CREATE TABLE IF NOT EXISTS wishes_letters (
  id VARCHAR(50) PRIMARY KEY,
  sender_name VARCHAR(200) NOT NULL,
  designation VARCHAR(200),
  organization VARCHAR(300),
  message TEXT,
  photo_url VARCHAR(500),
  received_date DATE,
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- YouTube Videos
CREATE TABLE IF NOT EXISTS youtube_videos (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  youtube_id VARCHAR(20) NOT NULL,
  description TEXT,
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  designation VARCHAR(200),
  department VARCHAR(100),
  photo_url VARCHAR(500),
  email VARCHAR(200),
  phone VARCHAR(20),
  bio TEXT,
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Partners
CREATE TABLE IF NOT EXISTS partners (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(300) NOT NULL,
  description TEXT,
  logo_url VARCHAR(500),
  website VARCHAR(300),
  partner_type ENUM('Government','NGO','Corporate','International') DEFAULT 'Government',
  is_active TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0
);

-- Complaint Submissions
CREATE TABLE IF NOT EXISTS complaint_submissions (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200),
  phone VARCHAR(20) NOT NULL,
  complaint_type VARCHAR(100),
  subject VARCHAR(500),
  message TEXT,
  status ENUM('pending','in_progress','resolved','rejected') DEFAULT 'pending',
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  admin_note TEXT
);

-- Footer Settings
CREATE TABLE IF NOT EXISTS footer_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  footer_text TEXT,
  facebook_url VARCHAR(300),
  twitter_url VARCHAR(300),
  youtube_url VARCHAR(300),
  instagram_url VARCHAR(300),
  copyright_text VARCHAR(500),
  show_quick_links TINYINT(1) DEFAULT 1,
  show_programs TINYINT(1) DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Media Files
CREATE TABLE IF NOT EXISTS media_files (
  id VARCHAR(50) PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  uploaded_at DATE,
  file_size VARCHAR(20)
);

-- Page Content
CREATE TABLE IF NOT EXISTS page_content (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  content LONGTEXT,
  is_published TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

SET FOREIGN_KEY_CHECKS = 1;
