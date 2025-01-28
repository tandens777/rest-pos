CREATE OR REPLACE PROCEDURE public.insert_floor(
    IN p_name character varying)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
  max_no int;
BEGIN
  -- Get the maximum id from the floor table
  SELECT COALESCE(MAX(id), 0) INTO max_no FROM floor;
  
  -- Increment the max_no to ensure a unique id
  max_no := max_no + 1;
  
  -- Insert the new record
  INSERT INTO floor (id, name) VALUES (max_no, p_name);
END;
$BODY$;
ALTER PROCEDURE public.insert_floor(character varying)
    OWNER TO postgres;
