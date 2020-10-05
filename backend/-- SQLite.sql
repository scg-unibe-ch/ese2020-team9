-- Short SQL-Query to manually give a User Admin Rights
UPDATE users
SET admin = true
WHERE userId = 1;
