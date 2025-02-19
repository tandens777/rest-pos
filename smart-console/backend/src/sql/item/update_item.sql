CREATE OR REPLACE PROCEDURE public.update_item(
    IN p_item_id int,
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
    IN p_soldout_flag character varying,
    IN p_lastupduserid character varying
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN 
    UPDATE public.item
    SET 
        item_code = p_item_code,
        item_desc = p_item_desc,
        short_nm = p_short_nm,
        sort_order = p_sort_order,
        chinese_item_desc = p_chinese_item_desc,
        cat_type_id = p_cat_type_id,
        parent_cat_id = p_parent_cat_id,
        is_category = p_is_category,
        station_id = p_station_id,
        per100g_flag = p_per100g_flag,
        default_price = p_default_price,
        addon_price = p_addon_price,
        picture_src = p_picture_src,
        default_unit_code = p_default_unit_code,
        disc_exempt = p_disc_exempt,
        allow_sc_on_exempt = p_allow_sc_on_exempt,
        non_vat_flag = p_non_vat_flag,
        active_flag = p_active_flag,
        show_on_pos_flag = p_show_on_pos_flag,
        reorder_limit = p_reorder_limit,
        track_invty_flag = p_track_invty_flag,
        send_to_printer_flag = p_send_to_printer_flag,
        allow_dinein_flag = p_allow_dinein_flag,
        allow_pickup_flag = p_allow_pickup_flag,
        allow_delivery_flag = p_allow_delivery_flag,
        soldout_flag = p_soldout_flag,
        lastupduserid = p_lastupduserid,
        lastupddt = NOW()
    WHERE item_id = p_item_id;
END;
$BODY$;

ALTER PROCEDURE public.update_item(
    int, character varying, character varying, character varying, integer, character varying, 
    integer, integer, character varying, integer, character varying, double precision, double precision, 
    character varying, character varying, character varying, character varying, character varying, 
    character varying, character varying, integer, character varying, character varying, 
    character varying, character varying, character varying, character varying, character varying
)
OWNER TO postgres;
