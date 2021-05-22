---ACTIVIDAD 1: CREAR TABLAS DE LOS EJEMPLOS CON EL PREFIJO DE SU NOMBRE ES DECIR
---CREATE TABLE uriel_producto.

CREATE TABLE product (
     id SERIAL PRIMARY KEY,
	name VARCHAR(100),
      price REAL,
      unit BIGINT
);

CREATE TABLE unit(
     id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

ALTER TABLE unit ADD CONSTRAINT unit_name_unique UNIQUE (name);

ALTER TABLE product ADD CONSTRAINT product_to_unit FOREIGN KEY (unit)  REFERENCES unit(id);

---ACTIVIDAD 2: Realizar registros en la tabla principal, realizar consultas, updates y deletes
---Es decir sobre las tablas unit y product sin sus prefijos: Se agregará una columna y una tabla para los
---presentes. Listar todos, listar donde el precio mayor a 10.
SELECT * FROM person;

INSERT INTO person(name) VALUES ('Aldair');

INSERT INTO unit(name, modifier) VALUES ('MiUnidad', (SELECT (id) FROM person WHERE name = 'Aldair'));

INSERT INTO product(name, price, unit, modifier) VALUES ('MiUnidad', 12.5, 1, (SELECT (id) FROM person WHERE name = 'Aldair'));

UPDATE product SET unit = NULL WHERE id = 1;

-----CONSULTAS--------
SELECT * FROM product WHERE price > 10;
SELECT DISTINCT(modifier) FROM product;
--JOIN-----
SELECT DISTINCT(modifier), person.* FROM product INNER JOIN person ON person.id = modifier;
SELECT * FROM product INNER JOIN unit ON product.unit = unit.id;
SELECT * FROM product LEFT JOIN unit ON product.unit = unit.id;
SELECT * FROM product RIGHT JOIN unit ON product.unit = unit.id;
---CONTAR-----
SELECT COUNT(id) FROM product;
---LIKE------
SELECT * FROM product WHERE UPPER(name) LIKE '%M%';
SELECT * FROM product WHERE UPPER(name) LIKE 'M%';
SELECT * FROM product WHERE UPPER(name) LIKE '%M';
----ORDENAR-----
SELECT * FROM product ORDER BY price DESC;
SELECT * FROM product ORDER BY price ASC;
----OPERACIONES-----
SELECT SUM(price) FROM product;
SELECT AVG(price) FROM product;
----GROUP------
SELECT unit, AVG(price) FROM product GROUP BY unit;
SELECT unit, SUM(price) FROM product GROUP BY unit;

--- ACTIVIDAD 3: Realizar el diagrama ER de su proyecto, realizar el diagrama Relacional resultante del anterios
--- Crear script para hacer las nuevas tablas del proyecto
