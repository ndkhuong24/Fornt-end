CREATE TABLE Voucher(
    id INT IDENTITY(1,1) PRIMARY KEY,
    code VARCHAR(10),
    [name] NVARCHAR(100),
    [type] INT,
    [value] FLOAT,
    maximum_value INT,
    condition_value INT, -- Thay đổi tên cột để tránh xung đột với từ khoá SQL
    quantity INT,
    [start_date] DATETIME,
    [end_date] DATETIME,
    --[status] INT
)

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
        AND [end_date] >= GETDATE()
        AND quantity > 0
        AND @NewCondition > Voucher.condition_value -- Sử dụng tên cột mới
END

DROP Procedure GetVoucherActivity
EXEC GetVoucherActivity @NewCondition=1500000000

INSERT INTO Voucher (code, [name], [type], [value], maximum_value, condition_value, quantity, [start_date], [end_date])
VALUES
('ABC123', N'Voucher 1', 1, 25.5, 100, 10, 50, '2023-11-01', '2023-11-30'),
('XYZ789', N'Voucher 2', 2, 15.75, 50, 5, 30, '2023-12-05', '2023-12-25'),
('DEF456', N'Voucher 3', 1, 30.0, 80, 15, 20, '2023-11-15', '2023-12-10'),
('GHI789', N'Voucher 4', 3, 40.25, 120, 20, 15, '2023-11-20', '2023-12-15'),
('JKL012', N'Voucher 5', 2, 20.5, 60, 8, 40, '2023-11-10', '2023-12-05');

SELECT * FROM Voucher
