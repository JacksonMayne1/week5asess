
// 1.
SELECT email FROM customers ORDER BY email ASC;

// 2.
SELECT id FROM orders WHERE customer_id IN (
SELECT customer_id FROM customers
WHERE fname = 'Elizabeth' AND lname = 'Crocker');

// 3.
SELECT SUM(num_cupcakes) AS total_cupcakes
FROM orders WHERE processed = FALSE;

// 4.
SELECT cupcakes.name, SUM(orders.num_cupcakes) AS total_cupcakes
FROM cupcakes LEFT JOIN orders ON cupcakes.id = orders.cupcake_id
GROUP BY cupcakes.name ORDER BY cupcakes.name ASC;

// 5.
SELECT customers.email, SUM(orders.num_cupcakes) AS total_cupcakes
FROM customers LEFT JOIN orders ON customers.id = orders.customer_id
GROUP BY customers.email ORDER BY total_cupcakes DESC;


