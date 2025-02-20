-- FUNCTION to insert a record in food_delivery_app_item_price when a new food_delivery_app is created
CREATE OR REPLACE FUNCTION trg_insert_food_delivery_app_item_price_on_app()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert a record for each existing item in food_item
    INSERT INTO food_delivery_app_item_price (app_id, item_id, app_add_pcnt, app_add_amt, app_price, active_flag)
    SELECT NEW.app_id, item_id, 0.0, 0.0, 0.0, 'Y'
    FROM food_item;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER to create food_delivery_app_item_price entries when a new food_delivery_app is inserted
CREATE TRIGGER trg_insert_food_delivery_app
AFTER INSERT ON food_delivery_app
FOR EACH ROW
EXECUTE FUNCTION trg_insert_food_delivery_app_item_price_on_app();


-- FUNCTION to insert a record in food_delivery_app_item_price when a new food_item is created
CREATE OR REPLACE FUNCTION trg_insert_food_delivery_app_item_price_on_item()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert a record for each existing app in food_delivery_app
    INSERT INTO food_delivery_app_item_price (app_id, item_id, app_add_pcnt, app_add_amt, app_price, active_flag)
    SELECT app_id, NEW.item_id, 0.0, 0.0, 0.0, 'Y'
    FROM food_delivery_app;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER to create food_delivery_app_item_price entries when a new food_item is inserted
CREATE TRIGGER trg_insert_item
AFTER INSERT ON item
FOR EACH ROW
EXECUTE FUNCTION trg_insert_food_delivery_app_item_price_on_item();


-- FUNCTION to delete related records in food_delivery_app_item_price when a food_delivery_app is deleted
CREATE OR REPLACE FUNCTION trg_delete_food_delivery_app_item_price_on_app()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete related records from food_delivery_app_item_price
    DELETE FROM food_delivery_app_item_price WHERE app_id = OLD.app_id;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER to delete records when a food_delivery_app is deleted
CREATE TRIGGER trg_delete_food_delivery_app
AFTER DELETE ON food_delivery_app
FOR EACH ROW
EXECUTE FUNCTION trg_delete_food_delivery_app_item_price_on_app();


-- FUNCTION to delete related records in food_delivery_app_item_price when a food_item is deleted
CREATE OR REPLACE FUNCTION trg_delete_food_delivery_app_item_price_on_item()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete related records from food_delivery_app_item_price
    DELETE FROM food_delivery_app_item_price WHERE item_id = OLD.item_id;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER to delete records when a food_item is deleted
CREATE TRIGGER trg_delete_item
AFTER DELETE ON item
FOR EACH ROW
EXECUTE FUNCTION trg_delete_food_delivery_app_item_price_on_item();



INSERT INTO food_delivery_app_item_price (app_id, item_id, app_add_pcnt, app_add_amt, app_price, active_flag)
    SELECT f.app_id, i.item_id, 0.0, 0.0, 0.0, 'Y'
    FROM food_delivery_app f, item i
	where 0 = (select count(*) from food_delivery_app_item_price where app_id = f.app_id and item_id = i.item_id); 