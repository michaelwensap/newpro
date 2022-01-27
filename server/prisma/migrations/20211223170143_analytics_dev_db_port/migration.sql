-- CreateTable
CREATE TABLE "audit_category_comments" (
    "sa_oppor_id" INTEGER NOT NULL,
    "object_id" INTEGER NOT NULL,
    "comments" VARCHAR(500),
    "record_update_user_id" UUID,
    "record_update_date" TIMESTAMP(6),
    "object_type" VARCHAR(20)
);

-- CreateTable
CREATE TABLE "audit_category_scope" (
    "sa_oppor_id" INTEGER NOT NULL,
    "object_key" INTEGER,
    "object_type" VARCHAR(20),
    "prev_val" VARCHAR(100),
    "new_val" VARCHAR(100),
    "record_update_user_id" UUID,
    "record_update_date" TIMESTAMP(6),
    "object_field" VARCHAR(30)
);

-- CreateTable
CREATE TABLE "dim_capiq_company_alternate_industry" (
    "company_id" INTEGER,
    "gics_id" INTEGER,
    "primary_industry_flag" INTEGER
);

-- CreateTable
CREATE TABLE "dim_capiq_company_primary_industry" (
    "company_id" INTEGER,
    "company_name" VARCHAR(2000),
    "gics_level" INTEGER,
    "gics_id" INTEGER,
    "gics_description" VARCHAR(100)
);

-- CreateTable
CREATE TABLE "dim_capiq_company_tags" (
    "company_id" INTEGER NOT NULL,
    "tags" VARCHAR
);

-- CreateTable
CREATE TABLE "dim_classification_all" (
    "class_type" VARCHAR(20),
    "class_type_id" INTEGER NOT NULL,
    "class_code" INTEGER NOT NULL,
    "class_desc" VARCHAR(250),
    "class_level" INTEGER,
    "class_level1_code" INTEGER,
    "class_level1_desc" VARCHAR(250),
    "class_level2_code" INTEGER,
    "class_level2_desc" VARCHAR(250),
    "class_level3_code" INTEGER,
    "class_level3_desc" VARCHAR(250),
    "class_level4_code" INTEGER,
    "class_level4_desc" VARCHAR(250),
    "class_level5_code" INTEGER,
    "class_level5_desc" VARCHAR(250),
    "class_level6_code" INTEGER,
    "class_level6_desc" VARCHAR(250),
    "class_level7_code" INTEGER,
    "class_level7_desc" VARCHAR(250),
    "class_level8_code" INTEGER,
    "class_level8_desc" VARCHAR(250),
    "class_level9_code" INTEGER,
    "class_level9_desc" VARCHAR(250),

    CONSTRAINT "dim_classification_all_industry_pkey" PRIMARY KEY ("class_type_id","class_code")
);

-- CreateTable
CREATE TABLE "dim_customer" (
    "customer_id" SERIAL NOT NULL,
    "customer_name" VARCHAR(250),
    "customer_info" VARCHAR(1000),
    "sap_crm_bp_id" INTEGER,
    "capiq_company" INTEGER,
    "customer_status" VARCHAR(250),
    "record_create_date" TIMESTAMP(6),
    "record_update_date" TIMESTAMP(6),
    "record_update_user_id" UUID,
    "create_user_id" UUID,

    CONSTRAINT "dim_customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "dim_exclusion_reason" (
    "exclusion_reason_skey" INTEGER NOT NULL,
    "l1_reason" VARCHAR(20),
    "l2_reason" VARCHAR(50),

    CONSTRAINT "dim_exclusion_reason_pkey" PRIMARY KEY ("exclusion_reason_skey")
);

-- CreateTable
CREATE TABLE "dim_gics_industry" (
    "capiq_industry_id" INTEGER,
    "goods_or_service" VARCHAR(12),
    "capiq_industry_desc" VARCHAR(100),
    "industry_level" VARCHAR(2),
    "l1_industry_name" VARCHAR(30),
    "l1_industry_id" INTEGER,
    "l2_industry_name" VARCHAR(60),
    "l2_industry_id" INTEGER,
    "l3_industry_name" VARCHAR(60),
    "l3_industry_id" INTEGER,
    "l4_industry_name" VARCHAR(70),
    "l4_industry_id" INTEGER,
    "l5_industry_name" VARCHAR(100),
    "l5_industry_id" INTEGER,
    "l6_industry_name" VARCHAR(100),
    "l6_industry_id" INTEGER,
    "l7_industry_name" VARCHAR(100),
    "l7_industry_id" INTEGER,
    "l8_industry_name" VARCHAR(100),
    "l8_industry_id" INTEGER,
    "l9_industry_name" VARCHAR(100),
    "l9_industry_id" INTEGER,
    "sourcing_eligible" VARCHAR(3),
    "buying_invoice_eligible" VARCHAR(3),
    "requistion_able" VARCHAR(3),
    "requisition_type" VARCHAR(50),
    "contract_invoice_eligible" VARCHAR(3),
    "commerce_automation_eligible" VARCHAR(3),
    "supp_chain_collab_eligible" VARCHAR(3),
    "discount_scf_eligible" VARCHAR(3),
    "sap_fieldglass_eligible" VARCHAR(3),
    "sap_concur_eligible" VARCHAR(3),
    "buy_process" VARCHAR(80),
    "industry_company_id" INTEGER,
    "cy2018_dpo" VARCHAR(25),
    "cy2018_dso" VARCHAR(25),
    "cy2018_dio" VARCHAR(25),
    "cy2018_ccc" VARCHAR(25),
    "cy2018_inventory_turns" DECIMAL(20,1),
    "cy2018_ebit_margin" DECIMAL(20,1),
    "wcm_summary_inscope" VARCHAR(25),
    "wcm_summary_outscope" VARCHAR(25),
    "create_timestamp" TIMESTAMP(6),
    "update_timestamp" TIMESTAMP(6),
    "sub_type_id" INTEGER,
    "working_captial_segmentation" VARCHAR(100),
    "spot_buy_eligible" VARCHAR(3)
);

-- CreateTable
CREATE TABLE "dim_opportunity_assessment" (
    "opportunity_assessment_id" SERIAL NOT NULL,
    "customer_id" INTEGER,
    "opportunity_name" VARCHAR(250),
    "sa_owner_user_id" UUID,
    "opportunity_start_date" TIMESTAMP(6),
    "opportunity_end_date" TIMESTAMP(6),
    "opportunity_status" VARCHAR(20),
    "spend_file_name" VARCHAR(250),
    "spend_file_desc" VARCHAR(500),
    "spend_file_id" INTEGER,
    "spend_file_class_system" VARCHAR(50),
    "spend_file_class_standard" VARCHAR(50),
    "spend_file_processed_date" TIMESTAMP(6),
    "record_create_date" TIMESTAMP(6),
    "record_update_date" TIMESTAMP(6),
    "record_update_user_id" UUID,
    "spend_file_std_cur" VARCHAR(50),

    CONSTRAINT "dim_opportunity_assessment_pkey" PRIMARY KEY ("opportunity_assessment_id")
);

-- CreateTable
CREATE TABLE "dim_pass_key" (
    "user_id" INTEGER NOT NULL,
    "pass_code" VARCHAR(1000),

    CONSTRAINT "dim_pass_key_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "dim_spend_file" (
    "spend_file" SERIAL NOT NULL,
    "opportunity_assesment_id" INTEGER,
    "customer_id" INTEGER,
    "spend_file_name" VARCHAR(250),
    "spend_file_desc" VARCHAR(1000),
    "spend_file_industry_type" VARCHAR(20),
    "spend_file_std_currency" VARCHAR(20),
    "spend_file_dmc_id" INTEGER,
    "spend_file_dmc_req_name" VARCHAR(250),
    "spend_file_dmc_proc_date" TIMESTAMP(6),
    "spend_file_comments" VARCHAR(1000),
    "record_create_date" TIMESTAMP(6),
    "record_update_date" TIMESTAMP(6),
    "record_update_user_id" INTEGER,

    CONSTRAINT "dim_spend_file_pkey" PRIMARY KEY ("spend_file")
);

-- CreateTable
CREATE TABLE "dim_unspsc" (
    "unspsc_key" INTEGER NOT NULL,
    "unspsc_code" INTEGER,
    "unspsc_desc" VARCHAR(250),
    "unspsc_def" VARCHAR(5000),
    "unspsc_level" INTEGER,
    "unspsc_code_l1" INTEGER,
    "unspsc_desc_l1" VARCHAR(250),
    "unspsc_code_l2" INTEGER,
    "unspsc_desc_l2" VARCHAR(250),
    "unspsc_code_l3" INTEGER,
    "unspsc_desc_l3" VARCHAR(250),
    "unspsc_code_l4" INTEGER,
    "unspsc_desc_l4" VARCHAR(250),

    CONSTRAINT "dim_unspsc_commodity_pkey" PRIMARY KEY ("unspsc_key")
);

-- CreateTable
CREATE TABLE "dim_user" (
    "user_id" UUID,
    "user_name" VARCHAR(250),
    "user_email_id" VARCHAR(250),
    "user_status" VARCHAR(250),
    "record_create_date" TIMESTAMP(6),
    "last_login_date" TIMESTAMP(6)
);

-- CreateTable
CREATE TABLE "fact_beroe_sub_category_softness_data" (
    "sub_category_id" INTEGER NOT NULL,
    "sub_category_name" VARCHAR(300),
    "price_index" DECIMAL(20,4),
    "input_cost_index" DECIMAL(20,4),
    "supply_demand_gap" DECIMAL(20,4),
    "market_competition" DECIMAL(20,4),
    "demand_index" DECIMAL(20,4),
    "create_timestamp" TIMESTAMP(6),

    CONSTRAINT "fact_beroe_sub_category_softness_data_pkey" PRIMARY KEY ("sub_category_id")
);

-- CreateTable
CREATE TABLE "stg_input_data_collection" (
    "sa_oppor_id" INTEGER,
    "record_id" VARCHAR(50),
    "vendor_id" VARCHAR(50),
    "vendor_name" VARCHAR(500),
    "last_sourced_date" VARCHAR(50),
    "contract_expiration_date" VARCHAR(50),
    "erp_system" VARCHAR(50),
    "erp_invoice_spend" VARCHAR(50),
    "erp_invoice_spend_iso_cur" VARCHAR(50),
    "erp_invoice_spend_in_standard_currency" VARCHAR(50),
    "currency_conversion_rate" VARCHAR(50),
    "erp_invoice_count" VARCHAR(50),
    "invoice_method" VARCHAR(50),
    "invoice_origination_country" VARCHAR(50),
    "erp_po_spend" VARCHAR(50),
    "erp_po_spend_iso_cur" VARCHAR(10),
    "erp_po_spend_in_standard_currency" VARCHAR(50),
    "erp_po_count" VARCHAR(50),
    "payment_count" VARCHAR(50),
    "payment_method" VARCHAR(50),
    "payment_terms_code" VARCHAR(50),
    "payment_term_description" VARCHAR(50),
    "standard_term" VARCHAR(50),
    "discount_term" VARCHAR(50),
    "discount_percentage" VARCHAR(50),
    "discounts_earned" VARCHAR(50),
    "discounts_lost" VARCHAR(50),
    "dpo" VARCHAR(50),
    "buyer_region" VARCHAR(50),
    "business_unit" VARCHAR(50),
    "gl_code" VARCHAR(50),
    "gl_code_description" VARCHAR(50),
    "sic_unspsc_code" VARCHAR(50),
    "sic_unspsc_description" VARCHAR(50),
    "erp_commodity_code_or_description_tier_1" VARCHAR(50),
    "erp_commodity_code_or_description_tier_2" VARCHAR(50),
    "vendor_tax_id" VARCHAR(50),
    "vendor_vat_id" VARCHAR(50),
    "vendor_duns" VARCHAR(50),
    "vendor_an_id" VARCHAR(50),
    "vendor_industry_description" VARCHAR(50),
    "vendor_address_line_1" VARCHAR(150),
    "vendor_address_line_2" VARCHAR(150),
    "vendor_city" VARCHAR(50),
    "vendor_state_province" VARCHAR(50),
    "vendor_postal_code" VARCHAR(50),
    "vendor_country" VARCHAR(50),
    "vendor_country_code" VARCHAR(50),
    "user_defined_text_field_1" VARCHAR(150),
    "user_defined_text_field_2" VARCHAR(150),
    "user_defined_text_field_3" VARCHAR(150),
    "user_defined_text_field_4" VARCHAR(150),
    "user_defined_text_field_5" VARCHAR(150),
    "user_defined_numeric_field_1" VARCHAR(50),
    "user_defined_numeric_field_2" VARCHAR(50),
    "user_defined_numeric_field_3" VARCHAR(50),
    "user_defined_numeric_field_4" VARCHAR(50),
    "user_defined_numeric_field_5" VARCHAR(50),
    "user_defined_date_field_1" VARCHAR(50),
    "fiscal_year" VARCHAR(50),
    "dedupe_stats" VARCHAR(50),
    "dedupe_key" VARCHAR(50),
    "anid_of_matched_supplier" VARCHAR(50),
    "capiq_company_id" VARCHAR(50),
    "classification_score" VARCHAR(50),
    "classification_source" VARCHAR(50),
    "classification_type" VARCHAR(50),
    "classification_code" VARCHAR(50),
    "direct_spend" VARCHAR(50),
    "scope_in_out" VARCHAR(50),
    "out_of_scope_reason" VARCHAR(100),
    "comments" VARCHAR(250)
);

-- CreateTable
CREATE TABLE "stg_input_data_collection_bkp" (
    "data_collection_skey" SERIAL NOT NULL,
    "sa_file_id" INTEGER,
    "record_id" INTEGER,
    "vendor_id" INTEGER,
    "vendor_name" VARCHAR(500),
    "erp_system" VARCHAR(50),
    "erp_invoice_spend" DECIMAL(27,7),
    "erp_invoice_spend_iso_cur" VARCHAR(10),
    "erp_invoice_spend_in_standard_currency" DECIMAL(27,7),
    "erp_invoice_spend_standard_iso_cur" VARCHAR(10),
    "currency_conversion_rate" DECIMAL(27,7),
    "erp_invoice_count" INTEGER,
    "invoice_method" VARCHAR(50),
    "invoice_origination_country" VARCHAR(50),
    "erp_po_spend" DECIMAL(27,7),
    "erp_po_spend_iso_cur" VARCHAR(10),
    "erp_po_spend_in_standard_currency" DECIMAL(27,7),
    "erp_po_spend_standard_iso_cur" VARCHAR(10),
    "erp_po_count" INTEGER,
    "payment_count" INTEGER,
    "payment_method" VARCHAR(50),
    "payment_terms_code" VARCHAR(50),
    "payment_term_description" VARCHAR(50),
    "standard_term" VARCHAR(50),
    "discount_term" VARCHAR(50),
    "discount_percentage" DECIMAL(27,7),
    "discounts_earned" DECIMAL(27,7),
    "discounts_lost" DECIMAL(27,7),
    "dpo" DECIMAL(27,7),
    "buyer_region" VARCHAR(50),
    "business_unit" VARCHAR(50),
    "gl_code" INTEGER,
    "gl_code_description" VARCHAR(50),
    "sic_unspsc_code" INTEGER,
    "sic_unspsc_description" VARCHAR(50),
    "erp_commodity_code_or_description_tier_1" VARCHAR(50),
    "erp_commodity_code_or_description_tier_2" VARCHAR(50),
    "vendor_tax_id" VARCHAR(50),
    "vendor_vat_id" VARCHAR(50),
    "vendor_duns" VARCHAR(50),
    "vendor_an_id" VARCHAR(50),
    "vendor_industry_description" VARCHAR(50),
    "vendor_address_line_1" VARCHAR(150),
    "vendor_address_line_2" VARCHAR(150),
    "vendor_city" VARCHAR(50),
    "vendor_state_province" VARCHAR(50),
    "vendor_postal_code" VARCHAR(50),
    "vendor_country_code" VARCHAR(50),
    "iso_country_code" VARCHAR(50),
    "user_defined_text_field_1" VARCHAR(150),
    "user_defined_text_field_2" VARCHAR(150),
    "user_defined_text_field_3" VARCHAR(150),
    "user_defined_text_field_4" VARCHAR(150),
    "user_defined_text_field_5" VARCHAR(150),
    "user_defined_numeric_field_1" DECIMAL(27,7),
    "user_defined_numeric_field_2" DECIMAL(27,7),
    "user_defined_numeric_field_3" DECIMAL(27,7),
    "user_defined_numeric_field_4" DECIMAL(27,7),
    "user_defined_numeric_field_5" DECIMAL(27,7),
    "user_defined_date_field_1" TIMESTAMP(6),
    "fiscal_year" INTEGER,
    "dedupe_stats" VARCHAR(50),
    "dedupe_key" VARCHAR(50),
    "ariba_network_match" VARCHAR(50),
    "supplier_name_on_an" VARCHAR(500),
    "anid_of_matched_supplier" VARCHAR(50),
    "classification_source" VARCHAR(50),
    "classification_id" INTEGER,
    "override_classfication_id" INTEGER,
    "scope_source" VARCHAR(50),
    "exclusion_reason" VARCHAR(100),
    "direct_spend" VARCHAR(50),
    "sourcing_eligible" VARCHAR(20),
    "management_level" VARCHAR(50),
    "comments" VARCHAR(250)
);

-- CreateTable
CREATE TABLE "var_class_type" (
    "spend_file_class_system" VARCHAR(50)
);

-- CreateTable
CREATE TABLE "wrk_category_update" (
    "oppor_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "category_scope" VARCHAR(20),
    "exclusion_reason_skey" INTEGER,
    "record_update_user_id" UUID,
    "record_update_date" TIMESTAMP(6),

    CONSTRAINT "pk_oppor_category_id" PRIMARY KEY ("oppor_id","category_id")
);

-- CreateTable
CREATE TABLE "wrk_input_data_collection" (
    "data_collection_skey" SERIAL NOT NULL,
    "sa_oppor_id" INTEGER,
    "record_id" INTEGER,
    "vendor_id" INTEGER,
    "vendor_name" VARCHAR(500),
    "last_sourced_date" TIMESTAMP(6),
    "contract_expiration_date" TIMESTAMP(6),
    "erp_system" VARCHAR(20),
    "erp_invoice_spend" DECIMAL(27,7),
    "erp_invoice_spend_iso_cur" VARCHAR(20),
    "erp_invoice_spend_in_standard_currency" DECIMAL(27,7),
    "currency_conversion_rate" DECIMAL(27,7),
    "erp_invoice_count" INTEGER,
    "invoice_method" VARCHAR(50),
    "invoice_origination_country" VARCHAR(50),
    "erp_po_spend" DECIMAL(27,7),
    "erp_po_spend_iso_cur" VARCHAR(20),
    "erp_po_spend_in_standard_currency" DECIMAL(27,7),
    "erp_po_count" INTEGER,
    "payment_count" INTEGER,
    "payment_method" VARCHAR(50),
    "payment_terms_code" VARCHAR(50),
    "payment_term_description" VARCHAR(50),
    "standard_term" VARCHAR(50),
    "discount_term" VARCHAR(50),
    "discount_percentage" DECIMAL(27,7),
    "discounts_earned" DECIMAL(27,7),
    "discounts_lost" DECIMAL(27,7),
    "dpo" DECIMAL(27,7),
    "buyer_region" VARCHAR(50),
    "business_unit" VARCHAR(50),
    "gl_code" INTEGER,
    "gl_code_description" VARCHAR(50),
    "sic_unspsc_code" INTEGER,
    "sic_unspsc_description" VARCHAR(50),
    "erp_commodity_code_or_description_tier_1" VARCHAR(50),
    "erp_commodity_code_or_description_tier_2" VARCHAR(50),
    "vendor_tax_id" VARCHAR(50),
    "vendor_vat_id" VARCHAR(50),
    "vendor_duns" VARCHAR(50),
    "vendor_an_id" VARCHAR(50),
    "vendor_industry_description" VARCHAR(50),
    "vendor_address_line_1" VARCHAR(150),
    "vendor_address_line_2" VARCHAR(150),
    "vendor_city" VARCHAR(50),
    "vendor_state_province" VARCHAR(50),
    "vendor_postal_code" VARCHAR(50),
    "vendor_country" VARCHAR(50),
    "vendor_country_code" VARCHAR(50),
    "user_defined_text_field_1" VARCHAR(150),
    "user_defined_text_field_2" VARCHAR(150),
    "user_defined_text_field_3" VARCHAR(150),
    "user_defined_text_field_4" VARCHAR(150),
    "user_defined_text_field_5" VARCHAR(150),
    "user_defined_numeric_field_1" DECIMAL(27,7),
    "user_defined_numeric_field_2" DECIMAL(27,7),
    "user_defined_numeric_field_3" DECIMAL(27,7),
    "user_defined_numeric_field_4" DECIMAL(27,7),
    "user_defined_numeric_field_5" DECIMAL(27,7),
    "user_defined_date_field_1" TIMESTAMP(6),
    "fiscal_year" INTEGER,
    "dedupe_stats" VARCHAR(20),
    "dedupe_key" VARCHAR(50),
    "anid_of_matched_supplier" VARCHAR(20),
    "capiq_company_id" INTEGER,
    "classification_score" VARCHAR(30),
    "classification_source" VARCHAR(20),
    "classification_type" INTEGER,
    "classification_code" INTEGER,
    "direct_spend" VARCHAR(20),
    "scope_in_out" VARCHAR(50),
    "out_of_scope_reason" VARCHAR(100),
    "comments" VARCHAR(500),
    "record_create_date" TIMESTAMP(6),
    "record_update_date" TIMESTAMP(6),
    "supplier_scope_override_flag" INTEGER
);
