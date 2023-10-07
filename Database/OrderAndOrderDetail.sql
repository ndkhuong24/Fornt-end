CREATE TYPE OrderDetailType AS TABLE
(
    [product_detail_id] INT,
    [quantity] INT,
	[price] INT
);
CREATE PROCEDURE InsertOrderAndOrderDetail
	@CustomerID INT,
	@UserID INT,
	@TotalPrice INT,
	@TranSportFee INT,
	@Description NVARCHAR(500),
	@VoucherID INT,
	@DiscountPrice INT,
	@FinalPrice INT,
	@Status INT,
	@OrderDetail OrderDetailType READONLY
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;

		DECLARE @OrderID INT

		INSERT INTO Orders(customer_id,[user_id],total_price,transport_fee,description_order,voucher_id,discount_price,final_price,[status])
		VALUES (@CustomerID,@UserID,@TotalPrice,@TranSportFee,@Description,@VoucherID,@DiscountPrice,@FinalPrice,@Status);

		SET @OrderID = SCOPE_IDENTITY();

		INSERT INTO OrderDetail (product_detail_id,order_id,quantity,price)
		SELECT [product_detail_id],@OrderID,[quantity],[price]
		FROM @OrderDetail

		COMMIT;
		
		PRINT N'Chèn dữ liệu thành công'
	END TRY
	BEGIN CATCH
		ROLLBACK;
		PRINT N'Đã xảy ra lỗi trong quá trình chèn dữ liệu';
	END CATCH
END