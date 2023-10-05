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

SELECT*FROM ProductDetail
SELECT*FROM Image

EXEC InsertProductAndImage @CategoryID = 1,@BrandID = 2,@ProductID = 3,@SizeID = 4,@ColorID = 5,@SoleID = 6,@MaterialID = 7,@Quantity = 10,@Price = 100,@ImageName = 'ProductImage.jpg',@ImageURL = 'https://png.pngtree.com/thumb_back/fw800/background/20230408/pngtree-blue-sky-clear-sky-image_2168219.jpg',@Status = 1