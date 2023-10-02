﻿use [master]
go
CREATE DATABASE DATN
go
use DATN
go
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
	[description] NVARCHAR(500),
	create_date DATETIME DEFAULT GETDATE(),
	[status] INT DEFAULT 1
)
CREATE TABLE ProductDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	category_id INT,
	brand_id INT,
	product_id INT,
	size_id INT,
	color_id INT,
	sole_id INT,
	material_id INT,
	quantity INT,
	price INT,
	[status] INT DEFAULT 1
)
CREATE TABLE [Image](
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[url] VARCHAR(500),
	product_detail_id INT,
	[status] INT DEFAULT 1
)
CREATE TABLE Commune(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100),
	district_id INT
)
CREATE TABLE District (
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100),
	province_id INT
)
CREATE TABLE Province(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100),
	province_code INT
)
CREATE TABLE [Address](
	id INT IDENTITY(1,1) PRIMARY KEY,
	detail_address nvarchar(100),
	commune_id INT,
	district_id INT,
	province_id INT,
)
CREATE TABLE Customer(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(200),
	username VARCHAR(100),
	[password] VARCHAR(100),
	email VARCHAR(100),
	phone VARCHAR(20),
	birthday DATE,
	gender INT,
	[status] INT DEFAULT 1
)
GO
INSERT INTO Customer([name]) VALUES (N'Khách lẻ')
GO
CREATE TABLE CustomerAddress(
	id INT IDENTITY(1,1)PRIMARY KEY,
	customer_id INT,
	address_id INT,
	[status] INT DEFAULT 1
)
CREATE TABLE Review(
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	product_detail_id INT,
	point INT,
	comment NVARCHAR(500)
)
CREATE TABLE CartDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	product_detail_id INT,
	quantity INT,
)
CREATE TABLE Roles(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(10)
)
CREATE TABLE Users(
	id INT IDENTITY(1,1) PRIMARY KEY,
	fullname NVARCHAR(100),
	email VARCHAR(100),
	gender INT,
	phone_number VARCHAR(30),
	username VARCHAR(100),
	[password] VARCHAR(100),
	role_id INT,
	[status] INT DEFAULT 1
)
CREATE TABLE UserAddress(
	id INT IDENTITY(1,1)PRIMARY KEY,
	[user_id] INT,
	address_id INT,
	[status] INT DEFAULT 1
)
CREATE TABLE Voucher(
	id INT IDENTITY(1,1) PRIMARY KEY,
	code VARCHAR(10),
	[name] NVARCHAR(100),
	[type] INT,
	[value] FLOAT,
	maximum_value INT,
	condition INT,
	[start_date] DATETIME,
	[end_date] DATETIME,
	[status] INT
)
CREATE TABLE [Order](
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	[user_id] INT,
	date_create DATETIME DEFAULT GETDATE(),
	total_price INT,
	transport_fee INT,
	[description_order] NVARCHAR(100),
	voucher_id INT,
	discount_price INT DEFAULT 0,
	final_price INT
)
CREATE TABLE OrderDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	product_detail_id INT,
	order_id INT,
	quantity INT,
	price INT
)

--PROCEDURE GET Style
CREATE PROCEDURE Style_Get
    @Id INT = NULL
AS
BEGIN
    -- Nếu tham số @Id không null, lấy bản ghi theo ID
    IF @Id IS NOT NULL
    BEGIN
        SELECT * FROM Style WHERE Id = @Id;
    END
    ELSE
    -- Ngược lại, trả về tất cả các bản ghi
    BEGIN
        SELECT * FROM Style;
    END
END;
--PROCEDURE INSERT Style
CREATE PROCEDURE PostStyle
(
	@Name NVARCHAR(100),
	@Status INT = NULL
)
AS
BEGIN
	SET NOCOUNT ON

	-- Kiểm tra xem tên đã tồn tại hay chưa
	IF NOT EXISTS (SELECT 1 FROM Style WHERE name = @Name)
	BEGIN
	-- Nếu tên chưa tồn tại, thực hiện thêm dữ liệu vào bảng
	INSERT INTO Style(name,status)
	VALUES (@Name,@Status);
	END
	ELSE
	BEGIN
		-- Nếu tên đã tồn tại, không thực hiện thêm dữ liệu mới
			PRINT 'Tên đã tồn tại trong bảng.';
		END
END
--PROCEDURE Delete from Style
CREATE PROCEDURE DeleteStyle
(
	@Id INT
)
AS
BEGIN
	SET NOCOUNT ON

	-- Kiểm tra xem tên đã tồn tại hay chưa
	IF EXISTS (SELECT 1 FROM Style WHERE id = @Id)
	BEGIN
	-- Nếu Id tồn tại trong Table, thì sẽ xóa
	DELETE FROM Style WHERE id=@Id
	END
	ELSE
	BEGIN
		-- Nếu tên không tồn tại, không thực hiện xóa
		PRINT 'Tên đã tồn tại trong bảng.';
	END
END
--PROCEDURE Update Style
CREATE PROCEDURE UpdateStyle
    @Id INT,
    @NewName NVARCHAR(100), -- Đổi tên Style mới
	@NewStatus INT
AS
BEGIN
    -- Kiểm tra xem Id truyền vào có tồn tại trong bảng Style không
    IF EXISTS (SELECT 1 FROM Style WHERE Id = @Id)
    BEGIN
        -- Thực hiện cập nhật Style
        UPDATE Style
        SET [name] = @NewName,[status]=@NewStatus
        WHERE Id = @Id;

        PRINT 'Cập nhật Style thành công';
    END
    ELSE
    BEGIN
        PRINT 'Id không tồn tại trong bảng Style';
    END
END;


--PROCEDURE INSERT PRODUCT
CREATE PROCEDURE PostProduct
(
	@Code VARCHAR(20),
	@Name NVARCHAR(100),
	@Style_id INT,
	@Description NVARCHAR(500),
	@Status INT = NULL
)
AS
BEGIN
	SET NOCOUNT ON

	-- Kiểm tra xem tên đã tồn tại hay chưa
	IF NOT EXISTS (SELECT 1 FROM Product WHERE [name] = @Name)
	BEGIN
	-- Nếu tên chưa tồn tại, thực hiện thêm dữ liệu vào bảng
	INSERT INTO Product(code,[name],style_id,[description],[status])
	VALUES (@Code,@Name,@Style_id,@Description,@Status);
	END
	ELSE
	BEGIN
		-- Nếu tên đã tồn tại, không thực hiện thêm dữ liệu mới
		PRINT 'Tên đã tồn tại trong bảng.';
	END
END

EXEC PostProduct @Code='Hello',@Name='Adidas Nike',@Style_id=1,@Description=N'Cực đẹp',@Status=1

--INSERT Style
EXEC PostStyle @Name='Classic Sneakers',@Status='1'
EXEC PostStyle @Name='Retro Sneakers',@Status='1'
EXEC PostStyle @Name='Running Sneakers',@Status='1'
EXEC PostStyle @Name='Skateboard Sneakers',@Status='1'
EXEC PostStyle @Name='High-Top Sneakers',@Status='1'
EXEC PostStyle @Name='Low-Top Sneakers',@Status='1'
EXEC PostStyle @Name='Fashion Sneakers',@Status='1'
EXEC PostStyle @Name='Dad Sneakers',@Status='1'
EXEC PostStyle @Name='Test',@Status=''
--EXEC PROCEDURE Style
EXEC Style_Get
EXEC DeleteStyle @Id='31'

DROP PROCEDURE PostStyle;


