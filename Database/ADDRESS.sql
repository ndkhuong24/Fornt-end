CREATE PROCEDURE GetAddressByUserID @UserID INT AS BEGIN
SELECT
	[Address].id AS AddressID,
	Province.ProvinceID AS ProvinceID,
	Province.ProvinceName AS ProvinceName,
	District.DistrictID AS DistrictID,
	District.DistrictName AS DistrictName,
	Commune.CommuneID AS CommuneID,
	Commune.CommuneName AS CommuneName,
	[Address].detail_address,
	[Address].[status]
FROM
	[Address]
	JOIN Users ON [Address].user_id = Users.id
	JOIN Province ON [Address].province_id = Province.ProvinceID
	JOIN District ON Province.ProvinceID = District.ProvinceID
	JOIN Commune ON District.DistrictID = Commune.DistrictID
WHERE
	Users.id = @UserID
END;

CREATE PROCEDURE UpdateAddressDefault
(
	@AddressID INT,
	@UserID INT
)
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;

		-- Kiểm tra xem @AddressID có tồn tại hay không
		IF NOT EXISTS (SELECT 1 FROM [Address] WHERE id = @AddressID AND user_id = @UserID)
		BEGIN
			-- @AddressID không tồn tại, hủy bỏ giao dịch
			ROLLBACK;
			THROW 51000, 'AddressID does not exist for the specified UserID.', 1;
		END

		-- Cập nhật địa chỉ được chỉ định thành mặc định
		UPDATE [Address]
		SET [status] = 1
		WHERE id = @AddressID AND user_id = @UserID;

		-- Đặt các địa chỉ khác của người dùng thành không phải mặc định
		UPDATE [Address]
		SET [status] = 0
		WHERE id != @AddressID AND user_id = @UserID;

		COMMIT;
	END TRY
	BEGIN CATCH
		-- Có lỗi xảy ra, quay lại giao dịch
		IF @@TRANCOUNT > 0
			ROLLBACK;

		-- Chuyển tiếp lỗi
		THROW;
	END CATCH;
END;


EXEC UpdateAddressDefault @AddressID = 2, @UserID = 3;

EXEC GetAddressByUserID @UserID=3


