CREATE TABLE Category(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Brand(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Style(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Product(
	id INT IDENTITY(1,1) PRIMARY KEY,
	code VARCHAR(20),
	[name] VARCHAR(500),
	style_id INT,
	brand_id INT,
	category_id INT,
	[description] NVARCHAR(500),
	create_date DATETIME DEFAULT GETDATE(),
	[status] INT DEFAULT 1
)
CREATE TABLE Size(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Color(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Sole(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Material(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE ImageChinh(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[path] NVARCHAR(MAX),
	product_detail_id INT
)
CREATE TABLE ImagePhu(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[path] NVARCHAR(MAX),
	product_detail_id INT
)
CREATE TABLE ProductDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	product_id INT,
	size_id INT,
	color_id INT,
	sole_id INT,
	material_id INT,
	quantity INT,
	price INT,
	[status] INT DEFAULT 1
)
CREATE TABLE CartDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[user_id] INT,
	product_detail_id INT,
	quantity INT,
)
CREATE TABLE Roles(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(10)
)
CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    fullname NVARCHAR(255),
    email NVARCHAR(255),
    gender INT,
    phone_number NVARCHAR(20),
    username NVARCHAR(255),
    [password] NVARCHAR(255),
    [status] INT,
    token NVARCHAR(255),
    tokencreationdate DATETIME,
);
CREATE TABLE Voucher(
	id INT IDENTITY(1,1) PRIMARY KEY,
	code VARCHAR(10),
	[name] NVARCHAR(100),
	[type] INT,
	[value] FLOAT,
	[maximum_value] INT,
	[condition_value] INT,
	[quantity] INT,
	[start_date] DATETIME,
	[end_date] DATETIME
)
CREATE TABLE [Orders](
	id INT IDENTITY(1,1) PRIMARY KEY,
	[user_id] INT,
	date_create DATETIME DEFAULT GETDATE(),
	total_price INT,
	transport_fee INT,
	[description_order] NVARCHAR(100),
	voucher_id INT,
	discount_price INT DEFAULT 0,
	final_price INT,
	[status] INT
)
CREATE TABLE OrderDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	product_detail_id INT,
	order_id INT,
	quantity INT,
	price INT
)
CREATE TABLE Authority (
	id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT,
	role_id INT,
)
CREATE TABLE ConfirmOrders(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[order_id] INT,
	[user_id] INT,
	[status] INT
)


CREATE TABLE Commune(
	CommuneID VARCHAR(50),
	CommuneName NVARCHAR(200)
)
CREATE TABLE District (
	DistrictName NVARCHAR(200),
	DistrictID VARCHAR(50)
)
CREATE TABLE Province(
	ProvinceName NVARCHAR(200),
	ProvinceID VARCHAR(50)
)
CREATE TABLE [Address](
	id INT IDENTITY(1,1) PRIMARY KEY,
	[user_id] INT,
	detail_address nvarchar(MAX),
	province_id VARCHAR(50),
	district_id VARCHAR(50),
	commune_id VARCHAR(50),
	[status] INT
)

DROP TABLE Commune
DROP TABLE District
DROP TABLE Province
DROP TABLE Address

DELETE FROM Commune
DELETE FROM District
DELETE FROM Province
DELETE FROM Address

SELECT * FROM Commune
SELECT * FROM District
SELECT * FROM Province
SELECT * FROM Address