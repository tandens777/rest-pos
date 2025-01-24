-- manually create a database called resto_pos and run the script below in that database

CREATE TABLE ACTIVE_ORDERS (
    order_id BIGINT NOT NULL,
    order_type CHAR(1) NOT NULL,
    order_status CHAR(1) NOT NULL,
    updatedby VARCHAR(20),
    section_no INTEGER NOT NULL,
    table_no INTEGER NOT NULL
);

CREATE TABLE BRANCH_ITEM (
    item_id INTEGER NOT NULL,
    price float8,
    addon_price float8,
    printer_name VARCHAR(255),
    driver_name VARCHAR(255),
    port VARCHAR(255),
    lastupduserid VARCHAR(20),
    lastupddt TIMESTAMP
);

CREATE TABLE branch_order (
	order_id bigint NOT NULL ,
	section_no int NULL ,
    table_no INTEGER NULL,
    txn_date TIMESTAMP NOT NULL,
    order_type CHAR(1) NOT NULL,
    order_status CHAR(1) NOT NULL,
    total_amt FLOAT8 NULL,
    disc_amt FLOAT8 NULL,
    paid_amt FLOAT8 NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL,
    cust_id BIGINT NULL,
    pickup_time TIMESTAMP NULL,
    paid_dt TIMESTAMP NULL,
    inv_no BIGINT NULL,
    bill_total_amt FLOAT8 NULL,
    bill_paid_amt FLOAT8 NULL,
    bill_subtotal_amt FLOAT8 NULL,
    bill_line_no INTEGER NULL,
    bill_page_no INTEGER NULL,
    guest_no INTEGER NULL,
    or_no VARCHAR(10) NULL,
    session_id INTEGER NULL,
    posted_flag CHAR(1) NULL,
    print_flag CHAR(1) NULL,
    cancel_flag CHAR(1) NULL,
    sales_vat FLOAT8 NULL,
    vat FLOAT8 NULL,
    sales_vexempt FLOAT8 NULL,
    vexempt FLOAT8 NULL,
    sc_disc FLOAT8 NULL,
    xpromo_sales FLOAT8 NULL,
    pwd_disc FLOAT8 NULL,
    svc_charge FLOAT8 NULL,
    local_tax FLOAT8 NULL,
    oth_charge FLOAT8 NULL,
    void_sales FLOAT8 NULL,
    refund_sales FLOAT8 NULL,
    sales_type VARCHAR(10) NULL
);

CREATE TABLE branch_order_approval (
    order_id BIGINT NOT NULL,
    activity VARCHAR(100) NOT NULL,
    approved_by VARCHAR(20) NOT NULL,
    approved_dt TIMESTAMP NOT NULL
);

CREATE TABLE branch_order_bill (
    order_id BIGINT NOT NULL,
    line_type VARCHAR(1) NOT NULL,
    line_no INTEGER NOT NULL,
    qty INTEGER NULL,
    food_desc VARCHAR(255) NULL,
    right_col VARCHAR(255) NULL,
    total_desc VARCHAR(255) NULL,
    total_amt FLOAT8 NULL,
    page_no INTEGER NOT NULL,
    sign VARCHAR(1) NULL,
    printed_flag VARCHAR(1) NULL,
    center_line VARCHAR(255) NULL,
    left_col VARCHAR(255) NULL,
    center_col VARCHAR(255) NULL,
    table_col VARCHAR(255) NULL,
    order_type VARCHAR(255) NULL,
    page_col VARCHAR(255) NULL
);

CREATE TABLE branch_order_dtl (
    order_id BIGINT NOT NULL,
    order_dtl_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    qty INTEGER NOT NULL,
    unit_code VARCHAR(20) NOT NULL,
    takeout_flag VARCHAR(1) NULL,
    txn_date TIMESTAMP NULL,
    status_flag VARCHAR(1) NULL,
    billed_flag VARCHAR(1) NULL,
    return_flag VARCHAR(1) NULL,
    updatedby VARCHAR(20) NULL,
    price FLOAT8 NULL,
    splitgroup VARCHAR(1) NULL,
    weight FLOAT8 NULL,
    name_ext VARCHAR(100) NULL,
    remarks VARCHAR(100) NULL,
    slip_no INTEGER NULL,
    orig_dtl_id INTEGER NULL,
    set_dtl_id INTEGER NULL,
    sc_indc CHAR(1) NULL,
    cup_no INTEGER NULL,
    tot_cup INTEGER NULL,
    sc_flag CHAR(1) NULL,
    svc_flag CHAR(1) NULL,
    size_amt FLOAT8 NULL
);

CREATE TABLE branch_order_payment (
    order_id BIGINT NOT NULL,
    dtl_id INTEGER NOT NULL,
    pay_mtd_id INTEGER NOT NULL,
    reference VARCHAR(255) NULL,
    amt FLOAT8 NULL,
    exp_dt VARCHAR(5) NULL,
    change_amt FLOAT8 NULL,
    txn_date TIMESTAMP NULL,
    status_flag VARCHAR(1) NULL,
    billed_flag VARCHAR(1) NULL,
    updatedby VARCHAR(20) NULL,
    splitgroup VARCHAR(1) NULL,
    emp_id VARCHAR(20) NULL
);

CREATE TABLE branch_order_refund (
    order_id BIGINT NOT NULL,
    reason VARCHAR(50) NOT NULL,
    refund_amt FLOAT8 NULL,
    lastupduserid VARCHAR(20) NOT NULL,
    lastupddt TIMESTAMP NOT NULL
);

CREATE TABLE branch_order_surdisc (
    order_id BIGINT NOT NULL,
    dtl_id INTEGER NOT NULL,
    disc_id INTEGER NOT NULL,
    reference VARCHAR(2000) NULL,
    amt FLOAT8 NULL,
    txn_date TIMESTAMP NULL,
    status_flag VARCHAR(1) NULL,
    billed_flag VARCHAR(1) NULL,
    updatedby VARCHAR(20) NULL,
    splitgroup VARCHAR(1) NULL,
    senior_no INTEGER NULL
);

CREATE TABLE cash_register (
    cr_id INTEGER NOT NULL,
    cr_name VARCHAR(50) NOT NULL,
    cr_location VARCHAR(255) NULL,
    balance FLOAT8 NULL,
    activity_type VARCHAR(1) NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL
);

CREATE TABLE cash_register_history (
    history_id BIGINT NOT NULL,
    cr_id INTEGER NOT NULL,
    balance FLOAT8 NOT NULL,
    activity_type VARCHAR(1) NOT NULL,
    lastupduserid VARCHAR(20) NOT NULL,
    lastupddt TIMESTAMP NOT NULL
);

CREATE TABLE COIN_POS_CURRENT (
    BR_CODE VARCHAR(10) NULL,
    N_CHECK VARCHAR(10) NULL,
    CLAS_C VARCHAR(10) NULL,
    CLAS_TRD_C VARCHAR(10) NULL,
    STOR_NO VARCHAR(10) NULL,
    TSL_NEW_A FLOAT8 NULL,
    TSL_OLD_A FLOAT8 NULL,
    SALE_TYPE VARCHAR(6) NULL,
    TSL_DAY_A FLOAT8 NULL,
    TSL_DIS_A FLOAT8 NULL,
    TSL_DIS_B FLOAT8 NULL,
    TSL_DIS_C FLOAT8 NULL,
    TSL_DIS_D FLOAT8 NULL,
    TSL_DIS_E FLOAT8 NULL,
    TSL_DIS_F FLOAT8 NULL,
    TSL_DIS_G FLOAT8 NULL,
    TSL_DIS_H FLOAT8 NULL,
    TSL_DIS_I FLOAT8 NULL,
    TSL_DIS_J FLOAT8 NULL,
    TSL_DIS_K FLOAT8 NULL,
    TSL_DIS_L FLOAT8 NULL,
    TSL_TAX_A FLOAT8 NULL,
    TSL_TAX_B FLOAT8 NULL,
    TSL_ADJ_A FLOAT8 NULL,
    TSL_ADJ_POS FLOAT8 NULL,
    TSL_ADJ_NEG FLOAT8 NULL,
    TSL_ADJ_NT_POS FLOAT8 NULL,
    TSL_ADJ_NT_NEG FLOAT8 NULL,
    TSL_NET_A FLOAT8 NULL,
    TSL_VOID FLOAT8 NULL,
    TSL_RFND FLOAT8 NULL,
    TSL_TX_SAL FLOAT8 NULL,
    TSL_NX_SAL FLOAT8 NULL,
    TSL_CHG FLOAT8 NULL,
    TSL_CSH FLOAT8 NULL,
    TSL_GC FLOAT8 NULL,
    TSL_EPS FLOAT8 NULL,
    TSL_TND FLOAT8 NULL,
    TSL_MCRD FLOAT8 NULL,
    TSL_VISA FLOAT8 NULL,
    TSL_AMEX FLOAT8 NULL,
    TSL_DINERS FLOAT8 NULL,
    TSL_JCB FLOAT8 NULL,
    TSL_OTCRD FLOAT8 NULL,
    TSL_SV_CHG FLOAT8 NULL,
    TSL_OT_CHG FLOAT8 NULL,
    TSL_FT BIGINT NULL,
    TSL_LT BIGINT NULL,
    TSL_NT BIGINT NULL,
    TSL_BEG_INV BIGINT NULL,
    TSL_END_INV BIGINT NULL,
    TSL_TC_CASH BIGINT NULL,
    TSL_TC_GC BIGINT NULL,
    TSL_TC_EPS BIGINT NULL,
    TSL_TC_TND BIGINT NULL,
    TSL_TC_MCD BIGINT NULL,
    TSL_TC_VIS BIGINT NULL,
    TSL_TC_AMX BIGINT NULL,
    TSL_TC_DIN BIGINT NULL,
    TSL_TC_JCB BIGINT NULL,
    TSL_TC_OC BIGINT NULL,
    TSL_MCH VARCHAR(20) NULL,
    TSL_SRL VARCHAR(30) NULL,
    TSL_ZCNT BIGINT NULL,
    TST_TIME VARCHAR(6) NULL,
    TSL_DTE VARCHAR(8) NULL,
    TSL_NAT_DISC FLOAT8 NULL,
    TSL_SMAC_DISC FLOAT8 NULL,
    TSL_ONLINE_DISC FLOAT8 NULL,
    TSL_SM01 FLOAT8 NULL,
    TSL_SM02 FLOAT8 NULL,
    TSL_SM03 FLOAT8 NULL
);

CREATE TABLE COIN_POS_OLD (
    txn_date TIMESTAMP NOT NULL,
    BR_CODE VARCHAR(10) NULL,
    N_CHECK VARCHAR(10) NULL,
    CLAS_C VARCHAR(10) NULL,
    CLAS_TRD_C VARCHAR(10) NULL,
    STOR_NO VARCHAR(10) NULL,
    TSL_NEW_A FLOAT8 NULL,
    TSL_OLD_A FLOAT8 NULL,
    SALE_TYPE VARCHAR(6) NULL,
    TSL_DAY_A FLOAT8 NULL,
    TSL_DIS_A FLOAT8 NULL,
    TSL_DIS_B FLOAT8 NULL,
    TSL_DIS_C FLOAT8 NULL,
    TSL_DIS_D FLOAT8 NULL,
    TSL_DIS_E FLOAT8 NULL,
    TSL_DIS_F FLOAT8 NULL,
    TSL_DIS_G FLOAT8 NULL,
    TSL_DIS_H FLOAT8 NULL,
    TSL_DIS_I FLOAT8 NULL,
    TSL_DIS_J FLOAT8 NULL,
    TSL_DIS_K FLOAT8 NULL,
    TSL_DIS_L FLOAT8 NULL,
    TSL_TAX_A FLOAT8 NULL,
    TSL_TAX_B FLOAT8 NULL,
    TSL_ADJ_A FLOAT8 NULL,
    TSL_ADJ_POS FLOAT8 NULL,
    TSL_ADJ_NEG FLOAT8 NULL,
    TSL_ADJ_NT_POS FLOAT8 NULL,
    TSL_ADJ_NT_NEG FLOAT8 NULL,
    TSL_NET_A FLOAT8 NULL,
    TSL_VOID FLOAT8 NULL,
    TSL_RFND FLOAT8 NULL,
    TSL_TX_SAL FLOAT8 NULL,
    TSL_NX_SAL FLOAT8 NULL,
    TSL_CHG FLOAT8 NULL,
    TSL_CSH FLOAT8 NULL,
    TSL_GC FLOAT8 NULL,
    TSL_EPS FLOAT8 NULL,
    TSL_TND FLOAT8 NULL,
    TSL_MCRD FLOAT8 NULL,
    TSL_VISA FLOAT8 NULL,
    TSL_AMEX FLOAT8 NULL,
    TSL_DINERS FLOAT8 NULL,
    TSL_JCB FLOAT8 NULL,
    TSL_OTCRD FLOAT8 NULL,
    TSL_SV_CHG FLOAT8 NULL,
    TSL_OT_CHG FLOAT8 NULL,
    TSL_FT BIGINT NULL,
    TSL_LT BIGINT NULL,
    TSL_NT BIGINT NULL,
    TSL_BEG_INV BIGINT NULL,
    TSL_END_INV BIGINT NULL,
    TSL_TC_CASH BIGINT NULL,
    TSL_TC_GC BIGINT NULL,
    TSL_TC_EPS BIGINT NULL,
    TSL_TC_TND BIGINT NULL,
    TSL_TC_MCD BIGINT NULL,
    TSL_TC_VIS BIGINT NULL,
    TSL_TC_AMX BIGINT NULL,
    TSL_TC_DIN BIGINT NULL,
    TSL_TC_JCB BIGINT NULL,
    TSL_TC_OC BIGINT NULL,
    TSL_MCH VARCHAR(20) NULL,
    TSL_SRL VARCHAR(30) NULL,
    TSL_ZCNT BIGINT NULL,
    TST_TIME VARCHAR(6) NULL,
    TSL_DTE VARCHAR(8) NULL,
    TSL_NAT_DISC FLOAT8 NULL,
    TSL_SMAC_DISC FLOAT8 NULL,
    TSL_ONLINE_DISC FLOAT8 NULL,
    TSL_SM01 FLOAT8 NULL,
    TSL_SM02 FLOAT8 NULL,
    TSL_SM03 FLOAT8 NULL
);

CREATE TABLE COMPANY_BRANCH (
    cmpy_nm VARCHAR(255) NOT NULL,
    operated_by VARCHAR(255) NULL,
    tin_no VARCHAR(255) NULL,
    address1 VARCHAR(255) NULL,
    address2 VARCHAR(255) NULL,
    roller_txt VARCHAR(255) NULL,
    delivery_charge_flag CHAR(1) NULL,
    branch_manager VARCHAR(255) NULL,
    branch_tel_no VARCHAR(100) NULL,
    email VARCHAR(255) NULL,
    logo_filename VARCHAR(255) NULL,
    dinein_count INTEGER NULL,
    pickup_count INTEGER NULL,
    dlvry_count INTEGER NULL,
    send_to_kitchen CHAR(1) NULL,
    track_invty_flag CHAR(1) NULL,
    reset_key VARCHAR(10) NULL,
    reset_counter VARCHAR(10) NULL,
    reset_date VARCHAR(20) NULL,
    last_print_date TIMESTAMP NULL,
    last_slip_no INTEGER NULL
);

CREATE TABLE TERMINAL (
    terminal_num VARCHAR(50) NOT NULL,
    serial_num VARCHAR(50) NOT NULL,
    terminal_desc VARCHAR(255) NOT NULL,
    nxt_inv_no INT NULL,
    nxt_or_no INT NULL,
    active_session_id INT NULL,
    active_cashier_emp_id VARCHAR(20) NULL,
    zread_dt TIMESTAMP NULL,
    zread_flag CHAR(1) NULL
);


CREATE TABLE CUSTOMER (
    cust_id BIGINT NOT NULL,
    cust_nm VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email_addr VARCHAR(100) NULL,
    mobile_no VARCHAR(255) NULL,
    login_passwd VARCHAR(100) NULL
);

CREATE TABLE DEPARTMENT (
    dept_id INTEGER NOT NULL,
    dept_nm VARCHAR(100) NOT NULL
);

CREATE TABLE DOWNPAYMENT (
    cust_id BIGINT NOT NULL,
    dp_id BIGINT NOT NULL,
    dp_date TIMESTAMP NULL,
    remarks VARCHAR(255) NULL,
    dp_amt float8 NULL,
    amt_paid float8 NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL,
    pay_mtd_id INTEGER NULL
);

CREATE TABLE DOWNPAYMENT_AUDIT (
    log_id BIGSERIAL NOT NULL,
    cust_id BIGINT NOT NULL,
    dp_id BIGINT NOT NULL,
    dp_date TIMESTAMP NULL,
    remarks VARCHAR(255) NULL,
    dp_amt float8 NULL,
    amt_paid float8 NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL,
    pay_mtd_id INTEGER NULL,
    action_type CHAR(1) NULL,
    action_by VARCHAR(30) NULL,
    action_date TIMESTAMP NULL
);

CREATE TABLE DOWNPAYMENT_DTL (
    cust_id BIGINT NOT NULL,
    dp_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    dp_dtl_id INTEGER NOT NULL,
    paid_date TIMESTAMP NULL,
    paid_amt float8 NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL
);

CREATE TABLE DOWNPAYMENT_DTL_AUDIT (
    log_id BIGSERIAL NOT NULL,
    cust_id BIGINT NOT NULL,
    dp_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    dp_dtl_id INTEGER NOT NULL,
    paid_date TIMESTAMP NULL,
    paid_amt float8 NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL,
    action_type CHAR(1) NULL,
    action_by VARCHAR(30) NULL,
    action_date TIMESTAMP NULL
);

CREATE TABLE DRAWER_AUDIT (
    txn_date TIMESTAMP NOT NULL,
    cashier VARCHAR(20) NULL,
    approved_by VARCHAR(20) NULL,
    witness_by VARCHAR(20) NULL
);

CREATE TABLE EMPLOYEE (
    emp_id VARCHAR(20) NOT NULL,
    emp_nm VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL,
    keypass VARCHAR(6) NULL,
    biometric_signature VARCHAR(5000) NULL,
    console_flag CHAR(1) NULL,
    drawer_flag CHAR(1) NULL
);

CREATE TABLE FOOD_DELIVERY_APP (
    app_id INTEGER NOT NULL,
    app_nm VARCHAR(100) NOT NULL,
    order_type char(1) NOT NULL,
    active_flag CHAR(1) NOT NULL
);

CREATE TABLE FOOD_DELIVERY_APP_ITEM_PRICE (
    app_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    app_add_pcnt FLOAT8 NULL,
    app_add_amt FLOAT8 NULL,
    app_price FLOAT8 NULL,
    active_flag CHAR(1) NULL
);

CREATE TABLE ITEM (
    item_id INT NOT NULL,
    item_code VARCHAR(50) NULL,
    item_desc VARCHAR(255) NOT NULL,
    inv_item_desc VARCHAR(255) NULL,
    sort_item_desc VARCHAR(255) NULL,
    chinese_item_desc VARCHAR(2000) NULL,
    item_cat_id INT NOT NULL,
    dept_id INT NOT NULL,
    per100g_flag CHAR(1) NULL,
    default_price FLOAT8 NULL,
    addon_price FLOAT8 NULL,
    picture_src VARCHAR(255) NULL,
    default_unit_code VARCHAR(20) NOT NULL,
    disc_exempt CHAR(1) NULL,
    allow_sc_on_exempt CHAR(1) NULL,
    non_vat_flag CHAR(1) NOT NULL,
    active_flag CHAR(1) NOT NULL,
    show_on_pos_flag CHAR(1) NOT NULL,
    reorder_limit INT NOT NULL,
    track_invty_flag CHAR(1) NULL,
    send_to_printer_flag CHAR(1) NULL,
    allow_dinein_flag CHAR(1) NULL,
    allow_pickup_flag CHAR(1) NULL,
    allow_delivery_flag CHAR(1) NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL
);

CREATE TABLE ITEM_BALANCE (
    location_id INT NOT NULL,
    item_id INT NOT NULL,
    qty_on_hand FLOAT8 NOT NULL
);

CREATE TABLE ITEM_CATEGORY (
    item_cat_id INT NOT NULL,
    item_cat_desc VARCHAR(255) NOT NULL,
    sort_cat_desc VARCHAR(255) NOT NULL,
    parent_cat_id INT NOT NULL,
    picture_src VARCHAR(255) NULL,
    cat_type_id CHAR(1) NOT NULL,
    disc_exempt CHAR(1) NULL,
    allow_sc_on_exempt CHAR(1) NULL,
    active_flag CHAR(1) NOT NULL,
    show_on_pos_flag CHAR(1) NOT NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL
);

CREATE TABLE ITEM_CATEGORY_TYPE (
    cat_type_id INT NOT NULL,
    cat_type_desc VARCHAR(255) NOT NULL
);

CREATE TABLE ITEM_GROUP (
    item_grp_id INT NOT NULL,
    item_grp_desc VARCHAR(255) NOT NULL
);

CREATE TABLE ITEM_GROUP_ITEMS (
    item_grp_id INT NOT NULL,
    item_id INT NOT NULL
);

CREATE TABLE ITEM_PROMO (
    item_id INT NOT NULL,
    promo_id INT NOT NULL,
    promo_desc VARCHAR(255) NOT NULL,
    promo_start_dt TIMESTAMP NULL,
    promo_end_dt TIMESTAMP NULL,
    promo_start_time TIMESTAMP NULL,
    promo_end_time TIMESTAMP NULL,
    mon_active CHAR(1) NULL,
    tue_active CHAR(1) NULL,
    wed_active CHAR(1) NULL,
    thu_active CHAR(1) NULL,
    fri_active CHAR(1) NULL,
    sat_active CHAR(1) NULL,
    sun_active CHAR(1) NULL,
    promo_price FLOAT8 NULL,
    promo_disc_pcnt FLOAT8 NULL,
    active_flag CHAR(1) NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL
);

CREATE TABLE ITEM_RECEIPT (
    ir_id BIGINT NOT NULL,
    txn_date TIMESTAMP NOT NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL,
    ir_desc VARCHAR(255) NULL,
    ir_ref_no VARCHAR(50) NULL,
    posted_flag CHAR(1) NULL
);

CREATE TABLE ITEM_RECEIPT_DTL (
    ir_id BIGINT NOT NULL,
    ir_dtl_id INT NOT NULL,
    item_id INT NOT NULL,
    unit_code VARCHAR(20) NOT NULL,
    qty FLOAT8 NOT NULL
);

CREATE TABLE ITEM_SET_MENU (
    set_item_id INT NOT NULL,
    set_dtl_id INT NOT NULL,
    menu_item_grp_id INT NULL,
    menu_item_id INT NULL,
    qty INT NULL,
    set_addon_price FLOAT8 NULL,
    sort_order INT NULL
);

CREATE TABLE ITEM_STOCKARD (
    location_id INT NOT NULL,
    item_id INT NOT NULL,
    txn_date TIMESTAMP NOT NULL,
    inout_indc CHAR(1) NOT NULL,
    txn_ref_type VARCHAR(10) NOT NULL,
    txn_ref_no VARCHAR(10) NOT NULL,
    txn_qty FLOAT8 NOT NULL,
    lastupduserid VARCHAR(20) NOT NULL,
    ref_date TIMESTAMP NOT NULL,
    run_qty_balance FLOAT8 NOT NULL,
    invty_qty_balance FLOAT8 NULL
);

CREATE TABLE ITEM_UNIT_CONVERSION (
    rm_item_id INT NOT NULL,
    unit_code VARCHAR(20) NOT NULL,
    conversion_to_default FLOAT8 NOT NULL
);

CREATE TABLE ITEM_USAGE_SETUP (
    item_id INT NOT NULL,
    rm_item_id INT NOT NULL,
    used_qty FLOAT8 NOT NULL,
    unit_code VARCHAR(20) NOT NULL
);

CREATE TABLE ORDER_STATUS (
    order_status CHAR(1) NOT NULL,
    order_status_desc VARCHAR(50) NOT NULL
);

CREATE TABLE ORDER_TYPE (
    order_type CHAR(1) NOT NULL,
    order_type_desc VARCHAR(50) NOT NULL
);

CREATE TABLE PAY_METHOD (
    pay_mtd_id INT NOT NULL,
    pay_mtd_desc VARCHAR(255) NOT NULL,
    parent_pay_mtd_id INT NULL,
    is_category CHAR(1) NULL,
    picture_src VARCHAR(255) NULL,
    need_ref CHAR(1) NULL,
    need_expdt CHAR(1) NULL,
    short_nm VARCHAR(255) NULL,
    active_flag CHAR(1) NULL,
    bank_charges FLOAT8 NULL,
    sm_pay_type INT NULL
);

CREATE TABLE PRICE_LIST_HISTORY (
    history_id BIGINT NOT NULL,
    item_id INT NOT NULL,
    price FLOAT8 NOT NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL
);

CREATE TABLE PRINTERS (
    printer_id INT NOT NULL,
    printer_nm VARCHAR(255) NOT NULL,
    device_nm VARCHAR(255) NULL,
    port VARCHAR(255) NULL,
    redirect_printer_id INT NOT NULL,
    copy_printer_id INT NULL,
    last_slip_no INT NULL
);

CREATE TABLE REMARKS (
    remark_id INT NOT NULL,
    remarks VARCHAR(255) NOT NULL,
    kitchen_bill_indc CHAR(1) NULL
);

CREATE TABLE REPORT (
    report_code VARCHAR(2) NOT NULL,
    report_desc VARCHAR(100) NOT NULL
);

CREATE TABLE REPORT_PRINTS (
    report_code VARCHAR(2) NOT NULL,
    session_date TIMESTAMP NULL,
    session_id INT NULL,
    print_times INT NOT NULL
);

CREATE TABLE RESERVATION (
    reserve_no VARCHAR(50) NOT NULL,
    section_no INT NOT NULL,
    table_no INT NOT NULL,
    reserve_dt TIMESTAMP NOT NULL,
    reserve_time TIMESTAMP NOT NULL,
    cust_id BIGINT NOT NULL,
    lastupduserid VARCHAR(20) NULL,
    lastupddt TIMESTAMP NULL
);

CREATE TABLE ROLE_TBL (
    role_id INT NOT NULL,
    role_desc VARCHAR(255) NOT NULL
);

CREATE TABLE ROLE_ACCESS (
    role_id INT NOT NULL,
    access_id INT NOT NULL
);

CREATE TABLE SESSION_TBL (
    session_id INT NOT NULL,
    cashier_start_emp_id VARCHAR(20) NULL,
    cashier_stop_emp_id VARCHAR(20) NULL,
    mgr_start_emp_id VARCHAR(20) NULL,
    mgr_stop_emp_id VARCHAR(20) NULL,
    start_datetime TIMESTAMP NULL,
    end_datetime TIMESTAMP NULL,
    cash_balance FLOAT8 NULL,
    active_flag CHAR(1) NULL,
    cash_balance_start FLOAT8 NULL,
    cash_balance_end FLOAT8 NULL
);

CREATE TABLE SIA_POS_TXN (
    ORDER_NUM VARCHAR(50) NOT NULL,
    BUS_DAY TIMESTAMP NOT NULL,
    CHECK_OPEN TIMESTAMP NULL,
    CHECK_CLOSE TIMESTAMP NULL,
    SALES_TYPE VARCHAR(50) NULL,
    TXN_TYPE VARCHAR(50) NULL,
    VOID INT NULL,
    VOID_AMT FLOAT8 NULL,
    REFUND INT NULL,
    REFUND_AMT FLOAT8 NULL,
    GUEST_CNT INT NULL,
    GUEST_SNR_CNT INT NULL,
    GUEST_PWD_CNT INT NULL,
    GROSS_SALES_AMT FLOAT8 NULL,
    NET_SALES_AMT FLOAT8 NULL,
    TOTAL_TAX FLOAT8 NULL,
    OTH_LOCAL_TAX FLOAT8 NULL,
    TOTAL_SVC FLOAT8 NULL,
    TOTAL_TIP FLOAT8 NULL,
    TOTAL_DISC FLOAT8 NULL,
    LESS_TAX_AMT FLOAT8 NULL,
    TAX_EXEMPT_SALES FLOAT8 NULL,
    REG_DISC_NAME VARCHAR(100) NULL,
    REG_DISC_AMT FLOAT8 NULL,
    EMP_DISC_AMT FLOAT8 NULL,
    SNR_DISC_AMT FLOAT8 NULL,
    VIP_DISC_AMT FLOAT8 NULL,
    PWD_DISC_AMT FLOAT8 NULL,
    NAT_DISC_AMT FLOAT8 NULL,
    SMAC_DISC_AMT FLOAT8 NULL,
    ONLINE_DISC_NAME VARCHAR(100) NULL,
    ONLINE_DISC_AMT FLOAT8 NULL,
    DISC1_NAME VARCHAR(100) NULL,
    DISC2_NAME VARCHAR(100) NULL,
    DISC3_NAME VARCHAR(100) NULL,
    DISC4_NAME VARCHAR(100) NULL,
    DISC5_NAME VARCHAR(100) NULL,
    DISC6_NAME VARCHAR(100) NULL,
    DISC1_AMT FLOAT8 NULL,
    DISC2_AMT FLOAT8 NULL,
    DISC3_AMT FLOAT8 NULL,
    DISC4_AMT FLOAT8 NULL,
    DISC5_AMT FLOAT8 NULL,
    DISC6_AMT FLOAT8 NULL,
    PAY_TYPE1 VARCHAR(100) NULL,
    PAY_AMT1 FLOAT8 NULL,
    PAY_TYPE2 VARCHAR(100) NULL,
    PAY_AMT2 FLOAT8 NULL,
    PAY_TYPE3 VARCHAR(100) NULL,
    PAY_AMT3 FLOAT8 NULL,
    TOTAL_CASH FLOAT8 NULL,
    TOTAL_GC FLOAT8 NULL,
    TOTAL_DC FLOAT8 NULL,
    TOTAL_ONLINE FLOAT8 NULL,
    TOTAL_OTH_TENDER FLOAT8 NULL,
    TOTAL_MASTER FLOAT8 NULL,
    TOTAL_VISA FLOAT8 NULL,
    TOTAL_AMEX FLOAT8 NULL,
    TOTAL_DINERS FLOAT8 NULL,
    TOTAL_JCB FLOAT8 NULL,
    TOTAL_OTH_CARD FLOAT8 NULL,
    TERM_NUM VARCHAR(50) NULL,
    SERIAL_NUM VARCHAR(50) NULL
);

CREATE TABLE SIA_POS_TXN_DTL (
    ORDER_NUM VARCHAR(50) NOT NULL,
    DTL_ID INT NOT NULL,
    ITEM_ID VARCHAR(50) NULL,
    ITEM_NAME VARCHAR(250) NULL,
    ITEM_PARENT_CAT VARCHAR(250) NULL,
    ITEM_CAT VARCHAR(250) NULL,
    ITEM_SUB_CAT VARCHAR(250) NULL,
    ITEM_QTY FLOAT8 NULL,
    TXN_PRICE FLOAT8 NULL,
    MENU_PRICE FLOAT8 NULL,
    DISC_CODE VARCHAR(100) NULL,
    DISC_AMT FLOAT8 NULL,
    MOD1_NAME VARCHAR(100) NULL,
    MOD1_QTY FLOAT8 NULL,
    MOD2_NAME VARCHAR(100) NULL,
    MOD2_QTY FLOAT8 NULL,
    VOID INT NULL,
    VOID_AMT FLOAT8 NULL,
    REFUND INT NULL,
    REFUND_AMT FLOAT8 NULL
);

CREATE TABLE SLIP (
    slip_no INT NOT NULL,
    slip_type CHAR(1) NOT NULL,
    txn_date TIMESTAMP NULL,
    printer_nm VARCHAR(255) NULL,
    driver_nm VARCHAR(255) NULL,
    port VARCHAR(100) NULL,
    dept_id INT NULL,
    approved_by VARCHAR(50) NULL,
    updated_by VARCHAR(50) NULL
);

CREATE TABLE SLIP_DTL (
    slip_no INT NOT NULL,
    line_type CHAR(1) NOT NULL,
    line_no INT NOT NULL,
    qty INT NULL,
    food_desc VARCHAR(255) NULL,
    right_col VARCHAR(255) NULL,
    total_desc VARCHAR(255) NULL,
    total_amt NUMERIC(19,4) NULL,
    page_no INT NOT NULL,
    sign CHAR(1) NULL,
    center_line VARCHAR(255) NULL,
    left_col VARCHAR(255) NULL,
    center_col VARCHAR(255) NULL,
    table_col VARCHAR(255) NULL,
    order_type VARCHAR(255) NULL,
    page_col VARCHAR(255) NULL,
    sqty VARCHAR(10) NULL,
    dept_id INT NULL,
    c_food_desc VARCHAR(2000) NULL
);

CREATE TABLE SM_DISCOUNT_TYPE (
    sm_discount_type INT NOT NULL,
    sm_discount_type_desc VARCHAR(50) NULL
);

CREATE TABLE SM_PAY_TYPE (
    sm_pay_type INT NOT NULL,
    sm_pay_type_desc VARCHAR(50) NULL
);

CREATE TABLE STORAGE_LOCATION (
    location_id INT NOT NULL,
    location_nm VARCHAR(255) NOT NULL
);

CREATE TABLE SURCHARGE_DISCOUNT (
    disc_id INT NOT NULL,
    disc_desc VARCHAR(255) NOT NULL,
    disc_type VARCHAR(5) NULL,
    parent_disc_id INT NULL,
    is_category VARCHAR(1) NULL,
    percentage FLOAT8 NULL,
    amt FLOAT8 NULL,
    picture_src VARCHAR(255) NULL,
    need_ref VARCHAR(1) NULL,
    short_nm VARCHAR(255) NULL,
    auto_flag VARCHAR(1) NULL,
    need_authorization VARCHAR(1) NULL,
    check_senior VARCHAR(1) NULL,
    active_flag CHAR(1) NULL,
    sm_discount_type INT NULL,
    pcnt_on_nv_flag CHAR(1) NULL
);


CREATE TABLE TERMINAL_DISPLAY (
    line_id INT NOT NULL,
    qty FLOAT8 NULL,
    line_desc VARCHAR(255) NULL,
    price FLOAT8 NULL,
    amt FLOAT8 NULL
);

CREATE TABLE UNIT (
    unit_code VARCHAR(20) NOT NULL,
    unit_desc VARCHAR(100) NOT NULL
);

ALTER TABLE ACTIVE_ORDERS ADD CONSTRAINT PK_ACTIVE_ORDERS PRIMARY KEY (order_id);
ALTER TABLE BRANCH_ITEM ADD CONSTRAINT PK_BRANCH_ITEM PRIMARY KEY (item_id);
ALTER TABLE BRANCH_ORDER ADD CONSTRAINT PK_BRANCH_ORDER PRIMARY KEY (order_id);
ALTER TABLE BRANCH_ORDER_APPROVAL ADD CONSTRAINT PK_BRANCH_ORDER_APPROVAL PRIMARY KEY (order_id, approved_by, approved_dt);
ALTER TABLE BRANCH_ORDER_BILL ADD CONSTRAINT PK_BRANCH_ORDER_BILL PRIMARY KEY (order_id, line_no, page_no);
ALTER TABLE BRANCH_ORDER_DTL ADD CONSTRAINT PK_BRANCH_ORDER_DTL PRIMARY KEY (order_id, order_dtl_id);
ALTER TABLE BRANCH_ORDER_PAYMENT ADD CONSTRAINT PK_BRANCH_ORDER_PAYMENT PRIMARY KEY (order_id, dtl_id);
ALTER TABLE BRANCH_ORDER_REFUND ADD CONSTRAINT PK_BRANCH_ORDER_REFUND PRIMARY KEY (order_id, lastupduserid, lastupddt);
ALTER TABLE BRANCH_ORDER_SURDISC ADD CONSTRAINT PK_BRANCH_ORDER_SURDISC PRIMARY KEY (order_id, dtl_id);
ALTER TABLE CASH_REGISTER ADD CONSTRAINT PK_CASH_REGISTER PRIMARY KEY (cr_id);
ALTER TABLE CASH_REGISTER_HISTORY ADD CONSTRAINT PK_CASH_REGISTER_HISTORY PRIMARY KEY (history_id, cr_id);
ALTER TABLE COIN_POS_OLD ADD CONSTRAINT PK_COIN_POS_OLD PRIMARY KEY (txn_date);
ALTER TABLE COMPANY_BRANCH ADD CONSTRAINT PK_COMPANY_BRANCH PRIMARY KEY (cmpy_nm);
ALTER TABLE CUSTOMER ADD CONSTRAINT PK_CUSTOMER PRIMARY KEY (cust_id);
ALTER TABLE DEPARTMENT ADD CONSTRAINT PK_DEPARTMENT PRIMARY KEY (dept_id);
ALTER TABLE DOWNPAYMENT ADD CONSTRAINT PK_DOWNPAYMENT PRIMARY KEY (cust_id, dp_id);
ALTER TABLE DOWNPAYMENT_AUDIT ADD CONSTRAINT PK_DOWNPAYMENT_AUDIT PRIMARY KEY (log_id, cust_id, dp_id);
ALTER TABLE DOWNPAYMENT_DTL ADD CONSTRAINT PK_DOWNPAYMENT_DTL PRIMARY KEY (cust_id, dp_id, order_id, dp_dtl_id);
ALTER TABLE DOWNPAYMENT_DTL_AUDIT ADD CONSTRAINT PK_DOWNPAYMENT_DTL_AUDIT PRIMARY KEY (log_id, cust_id, dp_id, order_id, dp_dtl_id);
ALTER TABLE DRAWER_AUDIT ADD CONSTRAINT PK_DRAWER_AUDIT PRIMARY KEY (txn_date);
ALTER TABLE EMPLOYEE ADD CONSTRAINT PK_EMPLOYEE PRIMARY KEY (emp_id);
ALTER TABLE FOOD_DELIVERY_APP ADD CONSTRAINT PK_FOOD_DELIVERY_APP PRIMARY KEY (app_id);
ALTER TABLE FOOD_DELIVERY_APP_ITEM_PRICE ADD CONSTRAINT PK_FOOD_DELIVERY_APP_ITEM_PRICE PRIMARY KEY (app_id, item_id);
ALTER TABLE ITEM ADD CONSTRAINT PK_ITEM PRIMARY KEY (item_id);
ALTER TABLE ITEM_BALANCE ADD CONSTRAINT PK_ITEM_BALANCE PRIMARY KEY (location_id, item_id);
ALTER TABLE ITEM_CATEGORY ADD CONSTRAINT PK_ITEM_CATEGORY PRIMARY KEY (item_cat_id);
ALTER TABLE ITEM_CATEGORY_TYPE ADD CONSTRAINT PK_ITEM_CATEGORY_TYPE PRIMARY KEY (cat_type_id);
ALTER TABLE ITEM_GROUP ADD CONSTRAINT PK_ITEM_GROUP PRIMARY KEY (item_grp_id);
ALTER TABLE ITEM_GROUP_ITEMS ADD CONSTRAINT PK_ITEM_GROUP_ITEMS PRIMARY KEY (item_grp_id, item_id);
ALTER TABLE ITEM_PROMO ADD CONSTRAINT PK_ITEM_PROMO PRIMARY KEY (item_id, promo_id);
ALTER TABLE ITEM_RECEIPT ADD CONSTRAINT PK_ITEM_RECEIPT PRIMARY KEY (ir_id);
ALTER TABLE ITEM_RECEIPT_DTL ADD CONSTRAINT PK_ITEM_RECEIPT_DTL PRIMARY KEY (ir_id, ir_dtl_id);
ALTER TABLE ITEM_SET_MENU ADD CONSTRAINT PK_ITEM_SET_MENU PRIMARY KEY (set_item_id, set_dtl_id);
ALTER TABLE ITEM_STOCKARD ADD CONSTRAINT PK_ITEM_STOCKARD PRIMARY KEY (location_id, item_id, txn_date, inout_indc);
ALTER TABLE ITEM_UNIT_CONVERSION ADD CONSTRAINT PK_ITEM_UNIT_CONVERSION PRIMARY KEY (rm_item_id, unit_code);
ALTER TABLE ITEM_USAGE_SETUP ADD CONSTRAINT PK_ITEM_USAGE_SETUP PRIMARY KEY (item_id, rm_item_id);
ALTER TABLE ORDER_STATUS ADD CONSTRAINT PK_ORDER_STATUS PRIMARY KEY (order_status);
ALTER TABLE ORDER_TYPE ADD CONSTRAINT PK_ORDER_TYPE PRIMARY KEY (order_type);
ALTER TABLE PAY_METHOD ADD CONSTRAINT PK_PAY_METHOD PRIMARY KEY (pay_mtd_id);
ALTER TABLE PRICE_LIST_HISTORY ADD CONSTRAINT PK_PRICE_LIST_HISTORY PRIMARY KEY (history_id, item_id);
ALTER TABLE PRINTERS ADD CONSTRAINT PK_PRINTERS PRIMARY KEY (printer_id);
ALTER TABLE REMARKS ADD CONSTRAINT PK_REMARKS PRIMARY KEY (remark_id);
ALTER TABLE REPORT ADD CONSTRAINT PK_REPORT PRIMARY KEY (report_code);
ALTER TABLE RESERVATION ADD CONSTRAINT PK_RESERVATION PRIMARY KEY (reserve_no);
ALTER TABLE SESSION_TBL ADD CONSTRAINT PK_SESSION PRIMARY KEY (session_id);
ALTER TABLE SIA_POS_TXN ADD CONSTRAINT PK_SIA_POS_TXN PRIMARY KEY (ORDER_NUM);
ALTER TABLE SIA_POS_TXN_DTL ADD CONSTRAINT PK_SIA_POS_TXN_DTL PRIMARY KEY (ORDER_NUM, DTL_ID);
ALTER TABLE SLIP ADD CONSTRAINT PK_SLIP PRIMARY KEY (slip_no);
ALTER TABLE SLIP_DTL ADD CONSTRAINT PK_SLIP_DTL PRIMARY KEY (slip_no, line_type, line_no);
ALTER TABLE SM_DISCOUNT_TYPE ADD CONSTRAINT PK_SM_DISCOUNT_TYPE PRIMARY KEY (sm_discount_type);
ALTER TABLE SM_PAY_TYPE ADD CONSTRAINT PK_SM_PAY_TYPE PRIMARY KEY (sm_pay_type);
ALTER TABLE STORAGE_LOCATION ADD CONSTRAINT PK_STORAGE_LOCATION PRIMARY KEY (location_id);
ALTER TABLE SURCHARGE_DISCOUNT ADD CONSTRAINT PK_SURCHARGE_DISCOUNT PRIMARY KEY (disc_id);
ALTER TABLE TERMINAL ADD CONSTRAINT PK_TERMINAL PRIMARY KEY (terminal_num);
ALTER TABLE TERMINAL_DISPLAY ADD CONSTRAINT PK_TERMINAL_DISPLAY PRIMARY KEY (line_id);
ALTER TABLE UNIT ADD CONSTRAINT PK_UNIT PRIMARY KEY (unit_code);

-- Create indexes
CREATE INDEX idx_active_orders ON active_orders(order_type, section_no, table_no, order_status, order_id);
CREATE INDEX idx_branch_order ON branch_order(order_id, section_no, table_no, txn_date, order_type, order_status);
CREATE INDEX idx_branch_order3 ON branch_order(txn_date, order_status);
CREATE INDEX idx_branch_order4 ON branch_order(inv_no);
CREATE INDEX idx_branch_order5 ON branch_order(paid_dt, order_status, order_type);
CREATE INDEX idx_branch_order_session ON branch_order(session_id);
CREATE INDEX idx_branch_order_approval ON branch_order_approval(order_id, approved_by, approved_dt);
CREATE INDEX idx_branch_order_bill2 ON branch_order_bill(order_id, line_type, line_no, page_no);
CREATE INDEX idx_branch_order_dtl2 ON branch_order_dtl(order_id, order_dtl_id, item_id, takeout_flag, txn_date, status_flag, billed_flag, return_flag);
CREATE INDEX idx_branch_order_pay2 ON branch_order_payment(order_id, dtl_id, pay_mtd_id, txn_date, status_flag, billed_flag, splitgroup);
CREATE INDEX idx_branch_order_pay4 ON branch_order_payment(txn_date, status_flag, billed_flag, splitgroup);
CREATE INDEX idx_branch_order_refund ON branch_order_refund(order_id, lastupduserid, lastupddt);
CREATE INDEX idx_branch_order_surdisc2 ON branch_order_surdisc(order_id, dtl_id, disc_id, txn_date, status_flag, billed_flag, splitgroup);
CREATE UNIQUE INDEX idx_coin_pos_old ON coin_pos_old(txn_date);
CREATE INDEX idx_customer2 ON customer(cust_id, cust_nm);
CREATE INDEX idx_downpayment ON downpayment(cust_id, dp_id, dp_date);
CREATE INDEX idx_downpayment_dtl ON downpayment_dtl(cust_id, dp_id, order_id, dp_dtl_id, paid_date);
CREATE INDEX idx_downpayment_dtl_pd_date ON downpayment_dtl(paid_date, dp_id, order_id);
CREATE UNIQUE INDEX idx_keypass ON employee(keypass);
CREATE INDEX idx_item_allow_dinein_flag ON item(item_id, allow_dinein_flag, active_flag);
CREATE INDEX idx_item_allow_pickup_flag ON item(item_id, allow_pickup_flag, active_flag);
CREATE INDEX idx_item_allow_dlvry_flag ON item(item_id, allow_delivery_flag, active_flag);
CREATE INDEX idx_item_show_on_pos_flag ON item(item_id, show_on_pos_flag, active_flag);
CREATE UNIQUE INDEX idx_item_item_code ON item(item_code);
CREATE INDEX idx_item2 ON item(item_id, item_desc, item_cat_id, inv_item_desc);
CREATE INDEX idx_item22 ON item(dept_id, item_code, sort_item_desc);
CREATE INDEX idx_item_category2 ON item_category(item_cat_id, item_cat_desc, parent_cat_id);
CREATE INDEX idx_item_promo_dates ON item_promo(promo_start_dt, promo_end_dt, promo_start_time, promo_end_time, active_flag);
CREATE INDEX idx_item_receipt ON item_receipt(ir_id, txn_date);
CREATE INDEX idx_item_receipt_dtl ON item_receipt_dtl(ir_id, ir_dtl_id, item_id);
CREATE INDEX idx_stockard2 ON item_stockard(location_id, item_id, txn_date, inout_indc, txn_ref_type, txn_ref_no);
CREATE INDEX idx_stockard88 ON item_stockard(location_id, item_id, ref_date, txn_ref_type, txn_ref_no, txn_date);
CREATE INDEX idx_item_item_usage_setup ON item_usage_setup(item_id, rm_item_id);
CREATE INDEX idx_remarks ON remarks(remark_id, kitchen_bill_indc);
CREATE INDEX idx_report_prints ON report_prints(report_code, session_date, session_id);
CREATE INDEX idx_reservation ON reservation(section_no, table_no, reserve_dt, cust_id);
CREATE UNIQUE INDEX idx_sia_pos_txn ON sia_pos_txn(order_num);
CREATE UNIQUE INDEX idx_sia_pos_txn_dtl ON sia_pos_txn_dtl(order_num, dtl_id);
CREATE INDEX idx_surcharge_disc2 ON surcharge_discount(disc_id, disc_desc, disc_type, auto_flag);
CREATE UNIQUE INDEX idx_unit_unit_desc ON unit(unit_desc);

-- GRANT permissions
GRANT SELECT, UPDATE, INSERT, DELETE ON active_orders TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON branch_item TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON branch_order TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON branch_order_approval TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON branch_order_bill TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON branch_order_dtl TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON branch_order_payment TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON branch_order_refund TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON branch_order_surdisc TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON cash_register TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON cash_register_history TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON coin_pos_current TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON coin_pos_old TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON company_branch TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON customer TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON department TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON downpayment TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON downpayment_audit TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON downpayment_dtl TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON downpayment_dtl_audit TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON drawer_audit TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON employee TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON food_delivery_app TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON food_delivery_app_item_price TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_balance TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_category TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_category_type TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_group TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_group_items TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_promo TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_receipt TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_receipt_dtl TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_set_menu TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_stockard TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_unit_conversion TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON item_usage_setup TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON order_status TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON order_type TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON pay_method TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON price_list_history TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON printers TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON remarks TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON report TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON report_prints TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON reservation TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON session_tbl TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON sia_pos_txn TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON sia_pos_txn_dtl TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON slip TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON slip_dtl TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON sm_discount_type TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON sm_pay_type TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON storage_location TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON surcharge_discount TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON terminal TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON terminal_display TO public;
GRANT SELECT, UPDATE, INSERT, DELETE ON unit TO public;


-- Add Foreign Key Constraints

ALTER TABLE public.active_orders ADD CONSTRAINT fk_active_orders_order_status FOREIGN KEY (order_status) REFERENCES public.order_status (order_status);

ALTER TABLE public.active_orders ADD CONSTRAINT fk_active_orders_order_type FOREIGN KEY (order_type) REFERENCES public.order_type (order_type);

ALTER TABLE public.branch_item ADD CONSTRAINT fk_branch_item_item FOREIGN KEY (item_id) REFERENCES public.item (item_id) ON DELETE CASCADE;

ALTER TABLE public.branch_order ADD CONSTRAINT fk_branch_order_customer FOREIGN KEY (cust_id) REFERENCES public.customer (cust_id),
    ADD CONSTRAINT fk_branch_order_order_status FOREIGN KEY (order_status) REFERENCES public.order_status (order_status),
    ADD CONSTRAINT fk_branch_order_order_type FOREIGN KEY (order_type) REFERENCES public.order_type (order_type),
    ADD CONSTRAINT fk_branch_order_session FOREIGN KEY (session_id) REFERENCES public.session_tbl (session_id);

ALTER TABLE public.branch_order_approval ADD CONSTRAINT fk_branch_order_approval_branch_order FOREIGN KEY (order_id) REFERENCES public.branch_order (order_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.branch_order_bill ADD CONSTRAINT fk_branch_order_bill_branch_order FOREIGN KEY (order_id) REFERENCES public.branch_order (order_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.branch_order_dtl ADD CONSTRAINT fk_branch_order_dtl_branch_order FOREIGN KEY (order_id) REFERENCES public.branch_order (order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_branch_order_dtl_item FOREIGN KEY (item_id) REFERENCES public.item (item_id),
    ADD CONSTRAINT fk_branch_order_dtl_unit FOREIGN KEY (unit_code) REFERENCES public.unit (unit_code);

ALTER TABLE public.branch_order_payment ADD CONSTRAINT fk_branch_order_payment_branch_order FOREIGN KEY (order_id) REFERENCES public.branch_order (order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_branch_order_payment_pay_method FOREIGN KEY (pay_mtd_id) REFERENCES public.pay_method (pay_mtd_id);

ALTER TABLE public.branch_order_refund ADD CONSTRAINT fk_branch_order_refund_branch_order FOREIGN KEY (order_id) REFERENCES public.branch_order (order_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.branch_order_surdisc ADD CONSTRAINT fk_branch_order_surdisc_branch_order FOREIGN KEY (order_id) REFERENCES public.branch_order (order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_branch_order_surdisc_surcharge_discount FOREIGN KEY (disc_id) REFERENCES public.surcharge_discount (disc_id);

ALTER TABLE public.cash_register_history ADD CONSTRAINT fk_cash_register_history_cash_register FOREIGN KEY (cr_id) REFERENCES public.cash_register (cr_id) ON DELETE CASCADE;

ALTER TABLE public.downpayment ADD CONSTRAINT fk_downpayment_customer FOREIGN KEY (cust_id) REFERENCES public.customer (cust_id);

ALTER TABLE public.downpayment_dtl ADD CONSTRAINT fk_downpayment_dtl_downpayment FOREIGN KEY (cust_id, dp_id) REFERENCES public.downpayment (cust_id, dp_id);


ALTER TABLE public.food_delivery_app_item_price ADD CONSTRAINT fk_food_dlvry_app_item_price_app FOREIGN KEY (app_id) REFERENCES public.food_delivery_app (app_id);

ALTER TABLE public.item ADD CONSTRAINT fk_item_dept FOREIGN KEY (dept_id) REFERENCES public.department (dept_id),
    ADD CONSTRAINT fk_item_item_category FOREIGN KEY (item_cat_id) REFERENCES public.item_category (item_cat_id),
    ADD CONSTRAINT fk_item_unit FOREIGN KEY (default_unit_code) REFERENCES public.unit (unit_code);

ALTER TABLE public.item_balance ADD CONSTRAINT fk_item_balance_item FOREIGN KEY (item_id) REFERENCES public.item (item_id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_item_balance_location FOREIGN KEY (location_id) REFERENCES public.storage_location (location_id) ON DELETE CASCADE;

ALTER TABLE public.item_group_items ADD CONSTRAINT fk_item_group_items_item FOREIGN KEY (item_id) REFERENCES public.item (item_id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_item_group_items_item_group FOREIGN KEY (item_grp_id) REFERENCES public.item_group (item_grp_id) ON DELETE CASCADE;

ALTER TABLE public.item_promo ADD CONSTRAINT fk_item_promo_item FOREIGN KEY (item_id) REFERENCES public.item (item_id) ON DELETE CASCADE;

ALTER TABLE public.item_receipt_dtl ADD CONSTRAINT fk_item_receipt_dtl_item FOREIGN KEY (item_id) REFERENCES public.item (item_id),
    ADD CONSTRAINT fk_item_receipt_dtl_item_receipt FOREIGN KEY (ir_id) REFERENCES public.item_receipt (ir_id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_item_receipt_dtl_unit FOREIGN KEY (unit_code) REFERENCES public.unit (unit_code);

ALTER TABLE public.item_set_menu ADD CONSTRAINT fk_item_set_menu FOREIGN KEY (set_item_id) REFERENCES public.item (item_id);

ALTER TABLE public.item_stockard ADD CONSTRAINT fk_item_stockard_item FOREIGN KEY (item_id) REFERENCES public.item (item_id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_item_stockard_location FOREIGN KEY (location_id) REFERENCES public.storage_location (location_id) ON DELETE CASCADE;

ALTER TABLE public.item_unit_conversion ADD CONSTRAINT fk_item_unit_conversion_item FOREIGN KEY (rm_item_id) REFERENCES public.item (item_id),
    ADD CONSTRAINT fk_item_unit_conversion_unit FOREIGN KEY (unit_code) REFERENCES public.unit (unit_code);

ALTER TABLE public.item_usage_setup ADD CONSTRAINT fk_item_usage_setup_item FOREIGN KEY (item_id) REFERENCES public.item (item_id),
    ADD CONSTRAINT fk_item_usage_setup_item2 FOREIGN KEY (rm_item_id) REFERENCES public.item (item_id),
    ADD CONSTRAINT fk_item_usage_setup_unit FOREIGN KEY (unit_code) REFERENCES public.unit (unit_code);

ALTER TABLE public.price_list_history ADD CONSTRAINT fk_price_list_history_item FOREIGN KEY (item_id) REFERENCES public.item (item_id) ON DELETE CASCADE;

ALTER TABLE public.reservation ADD CONSTRAINT fk_branch_reservation_customer FOREIGN KEY (cust_id) REFERENCES public.customer (cust_id);


ALTER TABLE public.sia_pos_txn_dtl ADD CONSTRAINT fk_sia_pos_txn_dtl FOREIGN KEY (order_num) REFERENCES public.sia_pos_txn (order_num) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.slip_dtl ADD CONSTRAINT fk_slip_dtl_slip FOREIGN KEY (slip_no) REFERENCES public.slip (slip_no) ON DELETE CASCADE ON UPDATE CASCADE;

------------------------

INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (1, 'Regular Discounts');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (2, 'Employee Discounts');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (3, 'Senior Citizen Discounts');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (4, 'VIP Discounts');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (5, 'PWD Discounts');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (6, 'GPC Discounts');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (7, 'Disc Field 1');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (8, 'Disc Field 2');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (9, 'Disc Field 3');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (10, 'Disc Field 4');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (11, 'Disc Field 5');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (12, 'Disc Field 6');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (13, '<NA>');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (14, 'Local Tax');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (15, 'Svc Charge');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (16, 'Other Charges');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (17, 'National Coach/Athlete/ Medal of Valor Discount');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (18, 'SMAC Discount');
INSERT INTO SM_DISCOUNT_TYPE (sm_discount_type, sm_discount_type_desc) VALUES (19, 'Online Deals');

-----------------------------------
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (1, 'Cash');
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (2, 'Gift Check/Card Sales');
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (3, 'Debit Card');
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (4, 'Other Tender');
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (5, 'Mastercard');
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (6, 'Visa');
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (7, 'American Express');
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (8, 'Diners');
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (9, 'JCB');
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (10, 'Other Cards');
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (11, 'E-Wallet/Online Sales');
INSERT INTO SM_PAY_TYPE (sm_pay_type, sm_pay_type_desc) VALUES (12, 'GCash');

INSERT INTO ORDER_TYPE (order_type, order_type_desc) VALUES ('N','DINE-IN');
INSERT INTO ORDER_TYPE (order_type, order_type_desc) VALUES ('P','TAKE-OUT');
INSERT INTO ORDER_TYPE (order_type, order_type_desc) VALUES ('D','DELIVERY');