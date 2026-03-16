IF OBJECT_ID ('dbo.clients') IS NOT NULL
	DROP TABLE dbo.clients
GO

CREATE TABLE dbo.clients
	(
	id         INT IDENTITY NOT NULL,
	name       VARCHAR (150) NOT NULL,
	email      VARCHAR (150) NOT NULL,
	phone      VARCHAR (20) NULL,
	created_at DATETIME DEFAULT (getdate()) NULL,
	PRIMARY KEY (id)
	)
GO

IF OBJECT_ID ('dbo.land_shipments') IS NOT NULL
	DROP TABLE dbo.land_shipments
GO

CREATE TABLE dbo.land_shipments
	(
	id            INT IDENTITY NOT NULL,
	shipment_id   INT NOT NULL,
	warehouse_id  INT NOT NULL,
	vehicle_plate VARCHAR (6) NOT NULL CONSTRAINT chk_vehicle_plate CHECK ([vehicle_plate] like '[A-Z][A-Z][A-Z][0-9][0-9][0-9]'),
	PRIMARY KEY (id),
	UNIQUE (shipment_id),
	CONSTRAINT FK_land_shipment FOREIGN KEY (shipment_id) REFERENCES dbo.shipments (id),
	CONSTRAINT FK_land_warehouse FOREIGN KEY (warehouse_id) REFERENCES dbo.warehouses (id)
	)
GO




IF OBJECT_ID ('dbo.ports') IS NOT NULL
	DROP TABLE dbo.ports
GO

CREATE TABLE dbo.ports
	(
	id      INT IDENTITY NOT NULL,
	name    VARCHAR (150) NOT NULL,
	city    VARCHAR (100) NULL,
	country VARCHAR (100) NULL,
	PRIMARY KEY (id)
	)
GO



IF OBJECT_ID ('dbo.products') IS NOT NULL
	DROP TABLE dbo.products
GO

CREATE TABLE dbo.products
	(
	id          INT IDENTITY NOT NULL,
	name        VARCHAR (150) NOT NULL,
	description VARCHAR (255) NULL,
	created_at  DATETIME DEFAULT (getdate()) NULL,
	PRIMARY KEY (id)
	)
GO

IF OBJECT_ID ('dbo.sea_shipments') IS NOT NULL
	DROP TABLE dbo.sea_shipments
GO

CREATE TABLE dbo.sea_shipments
	(
	id           INT IDENTITY NOT NULL,
	shipment_id  INT NOT NULL,
	port_id      INT NOT NULL,
	fleet_number VARCHAR (8) NOT NULL CONSTRAINT chk_fleet_number CHECK ([fleet_number] like '[A-Z][A-Z][A-Z][0-9][0-9][0-9][0-9][A-Z]'),
	PRIMARY KEY (id),
	UNIQUE (shipment_id),
	CONSTRAINT FK_sea_shipment FOREIGN KEY (shipment_id) REFERENCES dbo.shipments (id),
	CONSTRAINT FK_sea_port FOREIGN KEY (port_id) REFERENCES dbo.ports (id)
	)
GO



IF OBJECT_ID ('dbo.shipments') IS NOT NULL
	DROP TABLE dbo.shipments
GO

CREATE TABLE dbo.shipments
	(
	id              INT IDENTITY NOT NULL,
	client_id       INT NOT NULL,
	product_id      INT NOT NULL,
	shipment_type   VARCHAR (10) NOT NULL,
	quantity        INT NOT NULL CHECK ([quantity]>(0)),
	price           DECIMAL (10, 2) NOT NULL,
	discount        DECIMAL (10, 2) DEFAULT ((0)) NULL,
	total_price     DECIMAL (10, 2) NULL,
	register_date   DATETIME NOT NULL,
	delivery_date   DATETIME NOT NULL,
	tracking_number VARCHAR (50) NULL,
	PRIMARY KEY (id),
	UNIQUE (tracking_number),
	CONSTRAINT FK_shipment_client FOREIGN KEY (client_id) REFERENCES dbo.clients (id),
	CONSTRAINT FK_shipment_product FOREIGN KEY (product_id) REFERENCES dbo.products (id)
	)
GO

CREATE INDEX idx_tracking_number
	ON dbo.shipments (tracking_number)
GO

CREATE INDEX idx_client
	ON dbo.shipments (client_id)
GO



IF OBJECT_ID ('dbo.warehouses') IS NOT NULL
	DROP TABLE dbo.warehouses
GO

CREATE TABLE dbo.warehouses
	(
	id       INT IDENTITY NOT NULL,
	name     VARCHAR (150) NOT NULL,
	location VARCHAR (200) NULL,
	country  VARCHAR (100) NULL,
	PRIMARY KEY (id)
	)
GO


IF OBJECT_ID ('dbo.users') IS NOT NULL
	DROP TABLE dbo.users
GO

CREATE TABLE dbo.users
	(
	id         INT IDENTITY NOT NULL,
	email      VARCHAR (150) NOT NULL,
	password   VARCHAR (255) NOT NULL,
	created_at DATETIME DEFAULT (getdate()) NULL,
	PRIMARY KEY (id),
	UNIQUE (email)
	)
GO

