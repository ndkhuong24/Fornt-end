CREATE PROCEDURE InsertMultipleProductDetailsWithImages(
    @ProductDetailData TABLE (
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
    ),
    @ImageData TABLE (
        [name] NVARCHAR(100),
        [url] VARCHAR(500),
        product_detail_id INT,
        [status] INT DEFAULT 1
    )
)
AS
BEGIN
    BEGIN TRANSACTION; -- Bắt đầu giao dịch
    
    DECLARE @ProductDetailID INT;
    
    DECLARE @CategoryID INT, @BrandID INT, @ProductID INT, @SizeID INT, @ColorID INT,
            @SoleID INT, @MaterialID INT, @Quantity INT, @Price INT;
    DECLARE @ImageName NVARCHAR(100), @ImageURL VARCHAR(500);

    DECLARE curProductDetails CURSOR LOCAL FAST_FORWARD FOR
    SELECT category_id, brand_id, product_id, size_id, color_id,
           sole_id, material_id, quantity, price
    FROM @ProductDetailData;

    DECLARE curImages CURSOR LOCAL FAST_FORWARD FOR
    SELECT [name], [url], product_detail_id
    FROM @ImageData;

    OPEN curProductDetails;
    OPEN curImages;

    FETCH NEXT FROM curProductDetails INTO @CategoryID, @BrandID, @ProductID, @SizeID, @ColorID,
                                            @SoleID, @MaterialID, @Quantity, @Price;
    FETCH NEXT FROM curImages INTO @ImageName, @ImageURL, @ProductDetailID;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Chèn dữ liệu vào bảng ProductDetail
        INSERT INTO ProductDetail (category_id, brand_id, product_id, size_id, color_id, sole_id, material_id, quantity, price)
        VALUES (@CategoryID, @BrandID, @ProductID, @SizeID, @ColorID, @SoleID, @MaterialID, @Quantity, @Price);

        -- Lấy ID của bản ghi vừa chèn
        SET @ProductDetailID = SCOPE_IDENTITY();

        -- Chèn dữ liệu vào bảng Image
        INSERT INTO [Image] ([name], [url], product_detail_id)
        VALUES (@ImageName, @ImageURL, @ProductDetailID);

        FETCH NEXT FROM curProductDetails INTO @CategoryID, @BrandID, @ProductID, @SizeID, @ColorID,
                                                @SoleID, @MaterialID, @Quantity, @Price;
        FETCH NEXT FROM curImages INTO @ImageName, @ImageURL, @ProductDetailID;
    END;

    CLOSE curProductDetails;
    CLOSE curImages;

    DEALLOCATE curProductDetails;
    DEALLOCATE curImages;

    COMMIT; -- Hoàn thành giao dịch

    -- Thông báo thành công nếu cần
    PRINT 'Chèn dữ liệu thành công.';
END