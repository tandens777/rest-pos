CREATE OR REPLACE PROCEDURE public.change_employee_pin(
    IN p_username CHARACTER VARYING,
    IN p_new_password CHARACTER VARYING
)
LANGUAGE plpgsql
AS $$
DECLARE
    p_id BIGINT;
BEGIN
    -- Fetch employee ID
    SELECT id INTO p_id FROM employees WHERE username = p_username LIMIT 1;

    -- If employee is not found, raise an error
    IF p_id IS NULL THEN
        RAISE EXCEPTION 'Employee with username % not found', p_username;
    END IF;

    -- Update employee password
    UPDATE employees
    SET password = p_new_password
    WHERE id = p_id;

    -- Update user password (assuming `users` table uses the same `id`)
    UPDATE users
    SET password = p_new_password
    WHERE id = p_id;
END;
$$;

ALTER PROCEDURE public.change_employee_pin(
    CHARACTER VARYING, CHARACTER VARYING
) OWNER TO postgres;
