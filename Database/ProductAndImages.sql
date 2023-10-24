-- Định nghĩa kiểu dữ liệu bảng tạm thời dbo.ImageType
CREATE TYPE AnhChinhType AS TABLE
(
    [path] NVARCHAR(MAX)
);
GO
CREATE TYPE AnhPhuType AS TABLE
(
    [path] NVARCHAR(MAX)
); 
GO
CREATE PROCEDURE InsertProductDetail
    @CategoryID INT,
    @BrandID INT,
    @ProductID INT,
    @SizeID INT,
    @ColorID INT,
    @SoleID INT,
    @MaterialID INT,
    @Quantity INT,
    @Price INT,
    @ImageAnhChinh AnhChinhType READONLY, -- Tham số cho danh sách các ảnh 
	@ImageAnhPhu AnhPhuType READONLY -- Tham số cho danh sách các ảnh 
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION; -- Bắt đầu giao dịch

        DECLARE @ProductDetailID INT;

        -- Chèn dữ liệu vào bảng ProductDetail và lấy ID của bản ghi vừa chèn
        INSERT INTO ProductDetail (category_id, brand_id, product_id, size_id, color_id, sole_id, material_id, quantity, price)
        VALUES (@CategoryID, @BrandID, @ProductID, @SizeID, @ColorID, @SoleID, @MaterialID, @Quantity, @Price);

        SET @ProductDetailID = SCOPE_IDENTITY();

		INSERT INTO ImageChinh ([path],product_detail_id)
		SELECT [path],@ProductDetailID
		FROM @ImageAnhChinh

		INSERT INTO ImagePhu([path],product_detail_id)
		SELECT [path],@ProductDetailID
		FROM @ImageAnhPhu

       /* -- Chèn dữ liệu từ bảng tạm thời @Images vào bảng Image
        INSERT INTO [Image] ([name], [url], product_detail_id, [status])
        SELECT [name], [url], @ProductDetailID, [status]
        FROM @Images; */   

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

DROP PROCEDURE InsertProductDetail
DROP TYPE AnhChinhType
DROP TYPE AnhPhuType


DELETE FROM ImageChinh
DELETE FROM ImagePhu
DELETE FROM ProductDetail

SELECT * FROM ImageChinh
SELECT * FROM ImagePhu
SELECT * FROM ProductDetail