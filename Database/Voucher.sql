CREATE PROCEDURE GetVoucherActivity(
	@NewCondition INT
)
AS
BEGIN
	SELECT 
		*
	FROM 
		[Voucher]
	WHERE 
		[start_date] <= GETDATE()
		AND end_date >= GETDATE()
		AND quantity > 0
		AND @NewCondition>Voucher.condition
END
EXEC GetVoucherActivity @NewCondition=1500000000
