CREATE PROCEDURE InsertProductAndImage
    @CategoryID INT,
    @BrandID INT,
    @ProductID INT,
    @SizeID INT,
    @ColorID INT,
    @SoleID INT,
    @MaterialID INT,
    @Quantity INT,
    @Price INT,
    @ImageName NVARCHAR(100),
    @ImageURL VARCHAR(500),
	@Status INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION; -- Bắt đầu giao dịch

        DECLARE @ProductDetailID INT;

        -- Chèn dữ liệu vào bảng ProductDetail và lấy ID của bản ghi vừa chèn
        INSERT INTO ProductDetail (category_id, brand_id, product_id, size_id, color_id, sole_id, material_id, quantity, price)
        VALUES (@CategoryID, @BrandID, @ProductID, @SizeID, @ColorID, @SoleID, @MaterialID, @Quantity, @Price);

        SET @ProductDetailID = SCOPE_IDENTITY();

        -- Chèn dữ liệu vào bảng Image
        INSERT INTO [Image] ([name], [url], product_detail_id,[status])
        VALUES (@ImageName, @ImageURL, @ProductDetailID,@Status);

        COMMIT; -- Hoàn thành giao dịch

        -- Thông báo thành công nếu cần
        PRINT N'Chèn dữ liệu thành công.';
    END TRY
    BEGIN CATCH
        ROLLBACK; -- Quay lại trạng thái an toàn nếu có lỗi
        PRINT N'Đã xảy ra lỗi trong quá trình chèn dữ liệu.';
        -- Thực hiện các xử lý hoặc ghi log lỗi ở đây nếu cần
    END CATCH;
END

CREATE TYPE dbo.ImageType AS TABLE
(
    [name] NVARCHAR(100),
    [url] VARCHAR(500)
);

DROP PROCEDURE InsertProductAndImage

CREATE TYPE dbo.ImageType AS TABLE
(
    [name] NVARCHAR(100),
    [url] VARCHAR(500)
);

DROP PROCEDURE InsertProductAndImage

DROP TYPE ImageType

CREATE PROCEDURE InsertProductAndImage
    @CategoryID INT,
    @BrandID INT,
    @ProductID INT,
    @SizeID INT,
    @ColorID INT,
    @SoleID INT,
    @MaterialID INT,
    @Quantity INT,
    @Price INT,
    @Images dbo.ImageType READONLY, -- Tham số cho danh sách các ảnh
    @Status INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION; -- Bắt đầu giao dịch

        DECLARE @ProductDetailID INT;

        -- Chèn dữ liệu vào bảng ProductDetail và lấy ID của bản ghi vừa chèn
        INSERT INTO ProductDetail (category_id, brand_id, product_id, size_id, color_id, sole_id, material_id, quantity, price)
        VALUES (@CategoryID, @BrandID, @ProductID, @SizeID, @ColorID, @SoleID, @MaterialID, @Quantity, @Price);

        SET @ProductDetailID = SCOPE_IDENTITY();

        -- Chèn dữ liệu từ bảng tạm thời @Images vào bảng Image
        INSERT INTO [Image] ([name], [url], product_detail_id, [status])
        SELECT [name], [url], @ProductDetailID, @Status
        FROM @Images;

        COMMIT; -- Hoàn thành giao dịch

        -- Thông báo thành công nếu cần
        PRINT N'Chèn dữ liệu thành công.';
    END TRY
    BEGIN CATCH
        ROLLBACK; -- Quay lại trạng thái an toàn nếu có lỗi
        PRINT N'Đã xảy ra lỗi trong quá trình chèn dữ liệu.';
        -- Thực hiện các xử lý hoặc ghi log lỗi ở đây nếu cần
    END CATCH;
END;

DELETE FROM Image
DELETE FROM ProductDetail

-- Tạo bảng tạm thời để chứa danh sách các ảnh
DECLARE @ImagesTable dbo.ImageType;

-- Thêm các ảnh vào bảng tạm thời
INSERT INTO @ImagesTable ([name], [url])
VALUES
    ('Image1', 'URL1'),
    ('Image2', 'URL2'),
    ('Image3', 'URL3');

-- Gọi stored procedure InsertProductAndImage với bảng tạm thời @ImagesTable
EXEC InsertProductAndImage
    @CategoryID = 1,
    @BrandID = 2,
    @ProductID = 3,
    @SizeID = 4,
    @ColorID = 5,
    @SoleID = 6,
    @MaterialID = 7,
    @Quantity = 10,
    @Price = 100,
    @Images = @ImagesTable, -- Truyền bảng tạm thời vào tham số kiểu dữ liệu bảng tạm thời
    @Status = 1;


