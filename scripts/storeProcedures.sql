ALTER PROCEDURE SpCreateClient
    @name VARCHAR(150),
    @email VARCHAR(150),
    @phone VARCHAR(20)
AS
BEGIN
    INSERT INTO clients (name, email, phone)
    VALUES (@name, @email, @phone);

    SELECT id, name, email, phone, created_at 
    FROM clients 
    WHERE id = SCOPE_IDENTITY();
END
GO

ALTER PROCEDURE SpCreateLandShipment
    @client_id INT,
    @product_id INT,
    @quantity INT,
    @price DECIMAL(10,2),
    @warehouse_id INT,
    @vehicle_plate VARCHAR(20),
    @delivery_date DATE,
    @discount DECIMAL(10,2),
    @total_price DECIMAL(10,2),
    @tracking_number VARCHAR(30)
AS
BEGIN
    DECLARE @shipment_id INT;

    INSERT INTO shipments(
        client_id, product_id, shipment_type, quantity,
        price, discount, total_price, register_date,
        delivery_date, tracking_number
    )
    VALUES(
        @client_id, @product_id, 'LAND', @quantity,
        @price, @discount, @total_price, GETDATE(),
        @delivery_date, @tracking_number
    );

    SET @shipment_id = SCOPE_IDENTITY();

    INSERT INTO land_shipments(shipment_id, warehouse_id, vehicle_plate)
    VALUES(@shipment_id, @warehouse_id, @vehicle_plate);

    SELECT 
        s.id, s.tracking_number, s.client_id, s.product_id,
        s.shipment_type, s.quantity, s.price, s.discount,
        s.total_price, s.register_date, s.delivery_date,
        ls.vehicle_plate, ls.warehouse_id
    FROM shipments s
    INNER JOIN land_shipments ls ON ls.shipment_id = s.id
    WHERE s.id = @shipment_id;
END
GO

ALTER PROCEDURE SpCreatePort
    @name VARCHAR(150),
    @city VARCHAR(100),
    @country VARCHAR(100)
AS
BEGIN
    INSERT INTO ports (name, city, country)
    VALUES (@name, @city, @country);

    SELECT id, name, city, country
    FROM ports 
    WHERE id = SCOPE_IDENTITY();
END
GO

ALTER PROCEDURE SpCreateProduct
    @name VARCHAR(150),
    @description VARCHAR(255)
AS
BEGIN
    INSERT INTO products (name, description)
    VALUES (@name, @description);

    SELECT id, name, description, created_at 
    FROM products 
    WHERE id = SCOPE_IDENTITY();
END
GO

ALTER PROCEDURE SpCreateSeaShipment
    @client_id INT,
    @product_id INT,
    @quantity INT,
    @price DECIMAL(10,2),
    @port_id INT,
    @fleet_number VARCHAR(20),
    @delivery_date DATE,
    @discount DECIMAL(10,2),
    @total_price DECIMAL(10,2),
    @tracking_number VARCHAR(30)
AS
BEGIN
    DECLARE @shipment_id INT;

    INSERT INTO shipments(
        client_id, product_id, shipment_type, quantity,
        price, discount, total_price, register_date,
        delivery_date, tracking_number
    )
    VALUES(
        @client_id, @product_id, 'SEA', @quantity,
        @price, @discount, @total_price, GETDATE(),
        @delivery_date, @tracking_number
    );

    SET @shipment_id = SCOPE_IDENTITY();

    INSERT INTO sea_shipments(shipment_id, port_id, fleet_number)
    VALUES(@shipment_id, @port_id, @fleet_number);

    SELECT 
        s.id, s.tracking_number, s.client_id, s.product_id,
        s.shipment_type, s.quantity, s.price, s.discount,
        s.total_price, s.register_date, s.delivery_date,
        ss.fleet_number, ss.port_id
    FROM shipments s
    INNER JOIN sea_shipments ss ON ss.shipment_id = s.id
    WHERE s.id = @shipment_id;
END
GO

ALTER PROCEDURE SpCreateWarehouse
    @name VARCHAR(150),
    @location VARCHAR(200),
    @country VARCHAR(100)
AS
BEGIN
    INSERT INTO warehouses (name, location, country)
    VALUES (@name, @location, @country);

    SELECT id, name, location, country
    FROM warehouses 
    WHERE id = SCOPE_IDENTITY();
END
GO

ALTER PROCEDURE SpDeleteClient @id INT
AS
BEGIN
    DELETE FROM clients WHERE id = @id;
END
GO

ALTER PROCEDURE SpDeletePort @id INT
AS
BEGIN
    DELETE FROM ports WHERE id = @id;
END
GO

ALTER PROCEDURE SpDeleteProduct @id INT
AS
BEGIN
    DELETE FROM products WHERE id = @id;
END
GO

ALTER PROCEDURE SpDeleteWarehouse @id INT
AS
BEGIN
    DELETE FROM warehouses WHERE id = @id;
END
GO

ALTER PROCEDURE SpGetClientById @id INT
AS
BEGIN
    SELECT id, name, email, phone, created_at FROM clients WHERE id = @id;
END
GO

ALTER PROCEDURE SpGetClients
AS
BEGIN
    SELECT id, name, email, phone, created_at FROM clients;
END
GO

ALTER PROCEDURE SpGetPortById @id INT
AS
BEGIN
    SELECT id, name, city, country FROM ports WHERE id = @id;
END
GO

ALTER PROCEDURE SpGetPorts
AS
BEGIN
    SELECT id, name, city, country FROM ports;
END
GO

ALTER PROCEDURE SpGetProductById @id INT
AS
BEGIN
    SELECT id, name, description, created_at FROM products WHERE id = @id;
END
GO

ALTER PROCEDURE SpGetProducts
AS
BEGIN
    SELECT id, name, description, created_at FROM products;
END
GO

ALTER PROCEDURE SpGetShipments
AS
BEGIN
    SELECT 
        s.id,
        s.tracking_number,
        s.shipment_type,
        s.quantity,
        s.price,
        s.discount,
        s.total_price,
        s.register_date,
        s.delivery_date,
        c.name AS client,
        p.name AS product,
        ls.vehicle_plate,
        w.name AS warehouse,
        ss.fleet_number,
        po.name AS port
    FROM shipments s
    INNER JOIN clients c ON c.id = s.client_id
    INNER JOIN products p ON p.id = s.product_id
    LEFT JOIN land_shipments ls ON ls.shipment_id = s.id
    LEFT JOIN warehouses w ON w.id = ls.warehouse_id
    LEFT JOIN sea_shipments ss ON ss.shipment_id = s.id
    LEFT JOIN ports po ON po.id = ss.port_id
END
GO

ALTER PROCEDURE SpGetWarehouseById @id INT
AS
BEGIN
    SELECT id, name, location, country FROM warehouses WHERE id = @id;
END
GO

ALTER PROCEDURE SpGetWarehouses
AS
BEGIN
    SELECT id, name, location, country FROM warehouses;
END
GO

ALTER PROCEDURE SpUpdateClient
    @id INT,
    @name VARCHAR(150),
    @email VARCHAR(150),
    @phone VARCHAR(20)
AS
BEGIN
    UPDATE clients 
    SET name = @name, email = @email, phone = @phone
    WHERE id = @id;

    SELECT id, name, email, phone, created_at 
    FROM clients WHERE id = @id;
END
GO

ALTER PROCEDURE SpUpdatePort
    @id INT,
    @name VARCHAR(150),
    @city VARCHAR(100),
    @country VARCHAR(100)
AS
BEGIN
    UPDATE ports 
    SET name = @name, city = @city, country = @country
    WHERE id = @id;

    SELECT id, name, city, country
    FROM ports WHERE id = @id;
END
GO

ALTER PROCEDURE SpUpdateProduct
    @id INT,
    @name VARCHAR(150),
    @description VARCHAR(255)
AS
BEGIN
    UPDATE products 
    SET name = @name, description = @description
    WHERE id = @id;

    SELECT id, name, description, created_at 
    FROM products WHERE id = @id;
END
GO

ALTER PROCEDURE SpUpdateWarehouse
    @id INT,
    @name VARCHAR(150),
    @location VARCHAR(200),
    @country VARCHAR(100)
AS
BEGIN
    UPDATE warehouses 
    SET name = @name, location = @location, country = @country
    WHERE id = @id;

    SELECT id, name, location, country
    FROM warehouses WHERE id = @id;
END
GO

LTER PROCEDURE SpCreateUser
  @email VARCHAR(150),
  @password VARCHAR(255)
AS
BEGIN
  IF EXISTS (SELECT 1 FROM users WHERE email = @email)
  BEGIN
    RAISERROR('El email ya está registrado', 16, 1)
    RETURN
  END

  INSERT INTO users (email, password)
  VALUES (@email, @password)

  SELECT id, email, created_at
  FROM users
  WHERE id = SCOPE_IDENTITY()
END
GO

ALTER PROCEDURE SpGetUserByEmail
  @email VARCHAR(150)
AS
BEGIN
  SELECT id, email, password
  FROM users
  WHERE email = @email
END
GO

