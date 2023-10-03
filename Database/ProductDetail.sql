--PROCEDURE GET PRODUCT DETAIL
CREATE PROCEDURE GetProductDetail 
	@Id INT = NULL 
AS 
BEGIN -- Nếu tham số @Id không null, lấy bản ghi theo ID
	IF @Id IS NOT NULL 
	BEGIN
		SELECT * FROM ProductDetail WHERE id = @Id;
	END
	ELSE -- Ngược lại, trả về tất cả các bản ghi
	BEGIN
		SELECT
			PD.id,
			PD.category_id,
			PD.brand_id,
			PD.product_id,
			PD.size_id,
			PD.color_id,
			PD.sole_id,
			PD.material_id,
			PD.quantity,
			PD.price,
			PD.status,
			I.url,
			R.comment,
			R.point,
			P.name AS product_name
		FROM 
			ProductDetail AS PD
			JOIN Category AS C ON PD.category_id = C.id
			JOIN Brand AS B ON PD.brand_id = B.id
			JOIN Size AS S ON PD.size_id = S.id
			JOIN Color AS Cl ON PD.color_id = Cl.id
			JOIN Sole AS Sl ON PD.sole_id = Sl.id
			JOIN Material AS M ON PD.material_id = M.id
			FULL OUTER JOIN [Image] AS I ON I.product_detail_id = PD.id
			JOIN Review AS R ON R.product_detail_id = PD.id
			JOIN Product AS P ON PD.product_id = P.id;
	END
END;

EXEC GetProductDetail
DROP PROCEDURE GetProductDetail