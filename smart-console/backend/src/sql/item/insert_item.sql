CREATE OR REPLACE PROCEDURE public.insert_item(
    IN p_item_code character varying,
    IN p_item_desc character varying,
    IN p_short_nm character varying,
    IN p_sort_order integer,
    IN p_chinese_item_desc character varying,
    IN p_cat_type_id integer,
    IN p_parent_cat_id integer,
    IN p_is_category character varying,
    IN p_station_id integer,
    IN p_per100g_flag character varying,
    IN p_default_price double precision,
    IN p_addon_price double precision,
    IN p_picture_src character varying,
    IN p_default_unit_code character varying,
    IN p_disc_exempt character varying,
    IN p_allow_sc_on_exempt character varying,
    IN p_non_vat_flag character varying,
    IN p_active_flag character varying,
    IN p_show_on_pos_flag character varying,
    IN p_reorder_limit integer,
    IN p_track_invty_flag character varying,
    IN p_send_to_printer_flag character varying,
    IN p_allow_dinein_flag character varying,
    IN p_allow_pickup_flag character varying,
    IN p_allow_delivery_flag character varying,
    IN p_lastupduserid character varying
)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    max_no int;
BEGIN 
    -- Get the current highest item_id and increment it
    SELECT COALESCE(MAX(item_id), 0) INTO max_no FROM public.item;

    max_no := max_no + 1;

    -- Insert new item into the item table
    INSERT INTO public.item (
        item_id, item_code, item_desc, short_nm, sort_order, chinese_item_desc,
        cat_type_id, parent_cat_id, is_category, station_id, per100g_flag, default_price, addon_price,
        picture_src, default_unit_code, disc_exempt, allow_sc_on_exempt, non_vat_flag,
        active_flag, show_on_pos_flag, reorder_limit, track_invty_flag,
        send_to_printer_flag, allow_dinein_flag, allow_pickup_flag, allow_delivery_flag,
        lastupduserid, lastupddt
    ) VALUES (
        max_no, p_item_code, p_item_desc, p_short_nm, p_sort_order, p_chinese_item_desc,
        p_cat_type_id, p_parent_cat_id, p_is_category, p_station_id, p_per100g_flag, p_default_price, p_addon_price,
        p_picture_src, p_default_unit_code, p_disc_exempt, p_allow_sc_on_exempt, p_non_vat_flag,
        p_active_flag, p_show_on_pos_flag, p_reorder_limit, p_track_invty_flag,
        p_send_to_printer_flag, p_allow_dinein_flag, p_allow_pickup_flag, p_allow_delivery_flag,
        p_lastupduserid, NOW()
    );
END; 
$BODY$;

ALTER PROCEDURE public.insert_item(
    character varying, character varying, character varying, integer, character varying, 
    integer, integer, character varying, integer, character varying, double precision, double precision, 
    character varying, character varying, character varying, character varying, character varying, 
    character varying, character varying, integer, character varying, character varying, 
    character varying, character varying, character varying, character varying
)
OWNER TO postgres;
