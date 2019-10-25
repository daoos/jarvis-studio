<template
  ><v-container fluid>
    <div v-for="task in tasksFull" :key="task.id">
      <TablesToTablesConfTaskView :task="task" :dagContext="dagContext" />
    </div>
  </v-container>
</template>

<script>
import TablesToTablesConfTaskView from "@/components/widgets/configurations/TablesToTablesConfTaskView.vue";
import { Base64 } from "js-base64";
export default {
  components: {
    TablesToTablesConfTaskView
  },
  props: {
    tasksConf: {
      type: Array,
      default() {
        return [
          {
            id: "products",
            short_description: "Load PDA products table",
            doc_md: "000010_Load_PSA_to_PDA_products.md",
            sql_file: "000010_Load_PSA_to_PDA_products.sql",
            table_name: "products"
          },
          {
            id: "sales_details",
            short_description: "Load PDA sales_details table",
            write_disposition: "WRITE_APPEND",
            doc_md: "000010_Load_PSA_to_PDA_sales_details.md",
            sql_file: "000010_Load_PSA_to_PDA_sales_details.sql",
            table_name: "sales_details"
          },
          {
            id: "create_sales_details_table",
            short_description: "Create sales_details table",
            doc_md: "000010_Load_PSA_to_PDA_sales_details.md",
            write_disposition: "WRITE_TRUNCATE",
            task_type: "create_gbq_table",
            force_delete: true,
            bq_table: "sales_details",
            bq_table_description:
              "Every sales ticket line for Jules, Brice, Bizzbee and the Multistore (customer identified or not, physical stores and e-commerce, every country) since 2015-01-01.\\nPSA table: fd-io-dlk-jules.dlk_jules_psa.ventes_*",
            bq_table_timepartitioning_field: "sale_date",
            bq_table_clustering_fields: [],
            bq_table_schema: [
              {
                name: "PK_sales_details",
                type: "STRING",
                description:
                  "Primary key generated as the concatenation of the PSA table fields ticket_id, '-', ticket_line_number. WARNING: there are a few doubled lines (<0.01%)."
              },
              {
                name: "company_code",
                type: "STRING",
                description:
                  "Company code: Jules, Bizzbee, Brice, Multistore (or the company_code in input if not recognized)"
              },
              {
                name: "store_id",
                type: "NUMERIC",
                description:
                  "ID of the store where the receipt has been printed, cast as numeric for compatibility purposes with other tables. FK to stores table."
              },
              {
                name: "cash_register_id",
                type: "STRING",
                description: "Cash register ID"
              },
              {
                name: "cash_register_session_id",
                type: "STRING",
                description: "Cash register session number"
              },
              {
                name: "sale_datetime",
                type: "DATETIME",
                description: "Receipt date and time in local timezone"
              },
              {
                name: "sale_date",
                type: "DATE",
                description: "Receipt date (for partitionning)"
              },
              {
                name: "ticket_number",
                type: "STRING",
                description:
                  "Cash register's receipt counter. It's not unique! It's usefull only because it's part of the ticket ID"
              },
              {
                name: "line_number",
                type: "STRING",
                description: "Receipt line number"
              },
              {
                name: "loyalty_card_id",
                type: "STRING",
                description:
                  "Customer loyalty card linked to this ticket. null if no card."
              },
              {
                name: "customer_id",
                type: "STRING",
                description:
                  "Customer ID. null if unknown. Start with 0 or 1 for Jules, 2 for Bizzbee, 3 for Brice and 4 for Multistore. FK to customers table."
              },
              {
                name: "barcode",
                type: "STRING",
                description:
                  "Item barcode. There can be a few barcodes for a sku (for instance when a product is renewed, it can get a new barcode)"
              },
              {
                name: "product_sku",
                type: "NUMERIC",
                description:
                  "Item sku, i.e. an ID linked to a product in a specific size and color, cast as a numeric for compatibility purposes with other tables. FK to products table, with the season. WARNING: ~5% of the products have the same sku for differents seasons so you need to take the line with the proper season."
              },
              {
                name: "amount_including_taxes",
                type: "NUMERIC",
                description:
                  "Amount paid (after discounts, markdowns, etc) including taxes in EURO. This amount is negative for returns. It contains everything: product, service, gift card and donations (Jules' microdons for movember, product_sku=10000042)"
              },
              {
                name: "quantity",
                type: "NUMERIC",
                description:
                  "Item quantity (product, service, gift card and microdons donation). It's negative for returns."
              },
              {
                name: "movement_type",
                type: "STRING",
                description: "Movement type: Sales or Return"
              },
              {
                name: "brand_code",
                type: "STRING",
                description:
                  "Item brand code: Jules or Bizzbee (or the item_brand_code in input if not recognized). It's usefull to analyze Jules' and Bizzbee's products in Multistore. WARNING: Brice's products have 'Jules' as brand_code since the merger. If needed, you can use the brand_code in the products table instead."
              },
              {
                name: "ticket_id",
                type: "STRING",
                description:
                  "Unique ID of the ticket header. It's built as the concatenation of  id_store - jour de la vente - cash_desk_session_number - cash_desk_number - ticket_number"
              },
              {
                name: "item_category",
                type: "STRING",
                description:
                  "Item category: Product or Service (services i.e. loyalty card, shipping fees, gift card...)"
              },
              {
                name: "discount_including_taxes",
                type: "NUMERIC",
                description:
                  "Discount amout in EURO including taxes allocated to this ticket line. A discount amount is equaly distributed among each eligible line. For instance, 10€ for a  discount like 'Buy one t-shirt, get one 50% off' is distributed as 5€ for the first t-shirt and 5€ for the 2nd one."
              },
              {
                name: "markdown_including_taxes",
                type: "NUMERIC",
                description:
                  "Markdown in EURO including taxes. For example, a product which was sold 20€ at the beginning of the season and is sold 15€ now has a markdown amount of 5€."
              },
              {
                name: "initial_selling_price",
                type: "NUMERIC",
                description:
                  "Initial product price in EURO applicable at the beginning of the season. WARNING: a lot of products have a null initial product price"
              },
              {
                name: "margin_excluding_taxes",
                type: "NUMERIC",
                description: "Margin excluding taxes in euro."
              },
              {
                name: "channel_code",
                type: "STRING",
                description:
                  "Sale channel code: MAG for physical store, WEB for e-commerce"
              },
              {
                name: "detailed_channel_id",
                type: "STRING",
                description:
                  "Detailed sale channel.\\n1: in-store tablets sales\\n2: if not 1 and order delivred in store (for bonus calculation, these orders are attributed to the delivery store)\\n3: if not 1 nor 2 and web order with a loyalty card linked to a physical store (this order can be reattributed to the client's store)\\n4: if not 1, 2 nor 3 and this is an web order\\n0: for a classic in-store sales\\n5: for store orders, i.e. an order made through the vendor app, paid now, and taken from the e-commerce stock (can be delivered here, or at home or in another store)\\n6: for online reservation (note that the vendor must declare this sale as following an online reservation. If not, this is considered as a classic sale)\\n7: for store reservation, i.e. reservation through vendor app on another store's stock, which is going to be paid in this other store (note that the vendor in the delivery store must declare this sale as following a store reservation. If not, this is considered as a classic sale)"
              },
              {
                name: "amount_in_local_currency",
                type: "NUMERIC",
                description:
                  "Amount paid (after discounts, markdowns, etc) including taxes in local currency. This amount is negative for returns. It contains everything: product, service, gift card and donations (Jules' microdons for movember)"
              },
              {
                name: "local_currency",
                type: "STRING",
                description: "Local currency code"
              },
              {
                name: "taxes_amount",
                type: "NUMERIC",
                description: "Taxes amount"
              }
            ]
          },
          {
            id: "stocks",
            short_description: "Load PDA stocks table",
            doc_md: "000010_Load_PSA_to_PDA_stocks.md",
            sql_file: "000010_Load_PSA_to_PDA_stocks.sql",
            table_name: "stocks"
          },
          {
            id: "stores",
            short_description: "Load PDA stores table",
            doc_md: "000010_Load_PSA_to_PDA_stores.md",
            sql_file: "000010_Load_PSA_to_PDA_stores.sql",
            table_name: "stores"
          },
          {
            id: "discounts",
            short_description: "Load PDA discounts table",
            doc_md: "000010_Load_PSA_to_PDA_discounts.md",
            sql_file: "000010_Load_PSA_to_PDA_discounts.sql",
            table_name: "discounts"
          },
          {
            id: "offers",
            short_description: "Load PDA offers table",
            doc_md: "000010_Load_PSA_to_PDA_offers.md",
            sql_file: "000010_Load_PSA_to_PDA_offers.sql",
            table_name: "offers"
          },
          {
            id: "delivery_campaigns",
            short_description: "Load PDA delivery_campaigns table",
            doc_md: "000010_Load_PSA_to_PDA_delivery_campaigns.md",
            sql_file: "000010_Load_PSA_to_PDA_delivery_campaigns.sql",
            table_name: "delivery_campaigns"
          },
          {
            id: "broadlogs",
            short_description: "Load PDA broadlogs table",
            doc_md: "000010_Load_PSA_to_PDA_broadlogs.md",
            sql_file: "000010_Load_PSA_to_PDA_broadlogs.sql",
            table_name: "broadlogs"
          },
          {
            id: "delivery_tracking_logs",
            short_description: "Load PDA delivery_tracking_logs table",
            doc_md: "000010_Load_PSA_to_PDA_delivery_tracking_logs.md",
            sql_file: "000010_Load_PSA_to_PDA_delivery_tracking_logs.sql",
            table_name: "delivery_tracking_logs"
          },
          {
            id: "customers",
            short_description: "Load PDA customers table",
            doc_md: "000010_Load_PSA_to_PDA_customers.md",
            sql_file: "000010_Load_PSA_to_PDA_customers.sql",
            table_name: "customers"
          },
          {
            id: "sales_operations",
            short_description: "Load PDA sales_operations tables",
            doc_md: "000010_Load_PSA_to_PDA_sales_operations.md",
            sql_file: "000010_Load_PSA_to_PDA_sales_operations.sql",
            table_name: "sales_operations"
          },
          {
            id: "coupons",
            short_description: "Load PDA coupons tables",
            doc_md: "000010_Load_PSA_to_PDA_coupons.md",
            sql_file: "000010_Load_PSA_to_PDA_coupons.sql",
            table_name: "coupons"
          },
          {
            id: "product_theoretical_implantation",
            short_description:
              "Load PDA product_theoretical_implantation tables",
            doc_md:
              "000010_Load_PSA_to_PDA_product_theoretical_implantation.md",
            sql_file:
              "000010_Load_PSA_to_PDA_product_theoretical_implantation.sql",
            table_name: "product_theoretical_implantation"
          },
          {
            id: "customers_optins",
            short_description: "Load PDA Customer optins table",
            doc_md: "000010_Load_PSA_to_PDA_customers_optins.md",
            sql_file: "000010_Load_PSA_to_PDA_customers_optins.sql",
            table_name: "customers_optins"
          }
        ];
      }
    },
    tasksSQL: {
      type: Object,
      default() {
        return {
          ref_customer_array_last_purchases: {
            _binaryString:
              "IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0jCiMgUHJvamVjdCA6IGxvYWRfYmRhX2N1c3RvbWVyc19hbGxfdjEKIyBBdXRob3IgOiBNYXJpZSBDYWRpZXV4CiMgVmVyc2lvbiA6IDIuMAojIERhdGUgOiAyMDE5LTA1LTEwCiMgRGVzY3JpcHRpb24gOiBDb25zdHJ1Y3Rpb24gb2YgdGhlIGN1c3RvbWVyIGluZGljYXRvciAncyB0YWJsZQojICBhcnJheSBvZiB0aGUgbGFzdCBjdXN0b21lcidzIHB1cmNoYXNlcyAKIwojIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSMKIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0jCiMgRMODwqlwZW5kZW5jeSA6CiMgICBgZmQtaW8tZGxrLWp1bGVzLmRsa19qdWxlc19wZGEuc2FsZXNfZGV0YWlsc2AgCiMgYGZkLWlvLWRsay1qdWxlcy5kbGtfanVsZXNfcGRhLmRpc2NvdW50c2AgCiMgIGBmZC1pby1kbGstanVsZXMudG1wLnJlZl9jbGllbnRfaGlzdG9yaWNfZGF0ZWAgCiMgIGBmZC1pby1kbGstanVsZXMuZGxrX2p1bGVzX3BkYS5wcm9kdWN0c2AKIyAKIwojIERlc3RpbmF0aW9uIHRhYmxlIDogYGZkLWlvLWRsay1qdWxlcy50bXAucmVmX2NsaWVudF9hcnJheV9sYXN0X3B1cmNoYXNlc2AgCiMgICAgICAgICAgIAojLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSMKIAotLUNSRUFURSBUQUJMRSBgZmQtaW8tZGxrLWp1bGVzLnRtcC5yZWZfY3VzdG9tZXJfYXJyYXlfbGFzdF9wdXJjaGFzZXNgIEFTICgKCiBXSVRIIHRlbXBvcmFyeV90YWJsZSBBUygKCiAgICBTRUxFQ1QKICAgICAgYS5DdXN0b21lcl9pZCwKICAgICAgYS5jb21wYW55X2NvZGUsCiAgICAgIGEudGlja2V0X2lkLAogICAgICBhLnNhbGVfZGF0ZXRpbWUgYXMgcHVyY2hhc2VfZGF0ZSwKICAgICAgYS5saW5lX251bWJlciwKICAgICAgYS5wcm9kdWN0X3NrdSBhcyBhcnRpY2xlX2lkLAogICAgICBhLnF1YW50aXR5LAogICAgICBhLmFtb3VudF9pbmNsdWRpbmdfdGF4ZXMsCiAgICAgIGEubW92ZW1lbnRfdHlwZSBhcyB0eXBlX21vdmVtZW50LAogICAgICBSQU5LKCkgT1ZFUiAoIFBBUlRJVElPTiBCWSBhLmN1c3RvbWVyX2lkIE9SREVSIEJZIGEuc2FsZV9kYXRldGltZSBERVNDICkgQVMgcmFuawoKICAgIEZST00gYGZkLWlvLWRsay1qdWxlcy5kbGtfanVsZXNfcGRhLnNhbGVzX2RldGFpbHNgIGEKCgogICAgV0hFUkUKICAgICAgRVhUUkFDVChEQVRFIEZST00gYS5zYWxlX2RhdGV0aW1lICk+PSBEQVRFX0FERChEQVRFKCd7e1RFTVBMQVRFX0NVUlJFTlRfREFURX19JyksIElOVEVSVkFMIC0xIHllYXIpCiAgICAgIGFuZCAgRVhUUkFDVChEQVRFIEZST00gYS5zYWxlX2RhdGV0aW1lICk8REFURSgne3tURU1QTEFURV9DVVJSRU5UX0RBVEV9fScpCiAgICAgIGFuZCBhLmNvbXBhbnlfY29kZSBpbiAoJ0p1bGVzJywnQnJpY2UnLCdCaXp6YmVlJykKCgoKICAgR1JPVVAgQlkKICAgICAgQ3VzdG9tZXJfaWQsCiAgICAgIHB1cmNoYXNlX2RhdGUsCiAgICAgIGEuY29tcGFueV9jb2RlLAogICAgICB0aWNrZXRfaWQsCiAgICAgIGEuc2FsZV9kYXRldGltZSwKICAgICAgYS5saW5lX251bWJlciwKICAgICBhLnByb2R1Y3Rfc2t1LAogICAgICBhLnF1YW50aXR5LAogICAgICBhLmFtb3VudF9pbmNsdWRpbmdfdGF4ZXMsCiAgICAgIGEubW92ZW1lbnRfdHlwZQogICApIAoKICBTRUxFQ1QKICAgIGEuY3VzdG9tZXJfaWQsCiAgIGEuY29tcGFueV9jb2RlLAogICAgQVJSQVlfQUdHKFNUUlVDVCggYS50aWNrZXRfaWQsYS5wdXJjaGFzZV9kYXRlLCBhLmxpbmVfbnVtYmVyLGEuYXJ0aWNsZV9pZCxiLnJlZmVyZW5jZV9pZCwgYi5jb2xvcl9pZCwgYi5zaXplX2Rlc2MgLCBhLnF1YW50aXR5LGEuYW1vdW50X2luY2x1ZGluZ190YXhlcywgYS50eXBlX21vdmVtZW50LCBiLnB1cmNoYXNlX2ZhbWlsbHlfaWQgICBhcyBpZF9mYW1pbHksIGIucHVyY2hhc2VfZmFtaWxseV9kZXNjICAgYXMgd29yZGluZ19mYW1pbHkpCgogICBPUkRFUiBCWSBwdXJjaGFzZV9kYXRlIEFTQykgQVMgbGFzdF9QdXJjaGFzZXMKCiAgIEZST00gdGVtcG9yYXJ5X3RhYmxlIGEgCgogICBMRUZUIEpPSU4gIGBmZC1pby1kbGstanVsZXMuZGxrX2p1bGVzX3BkYS5wcm9kdWN0c2AgYgoKICAgT04KICAgICAgYi5jb21wYW55X2NvZGU9IGEuY29tcGFueV9jb2RlCiAgIEFORCBiLnByb2R1Y3Rfc2t1ID0gYS5hcnRpY2xlX2lkCiAgICAgIAogICBXSEVSRSAgcmFuazw9NQoKICAgR1JPVVAgQlkKICAgIGEuY3VzdG9tZXJfaWQsCiAgICBhLmNvbXBhbnlfY29kZQotLSkgOw=="
          },
          ref_customer_code_distance_majdi: {
            _binaryString:
              "LS1DUkVBVEUgVEFCTEUgYGZkLWlvLWRsay1qdWxlcy50bXAucmVmX2N1c3RvbWVyX0NvZGVfZGlzdGFuY2VfTWFqZGlgIEFTICgKICAgICMgTGlzdGUgZGVzICBtYWdhc2lucyBGcmFuw4PCp2FpcyBvdXZlcnRzIEp1bGVzIGV0IEJyaWNlCiAgV0lUSAogICAgbWFnYXNpbnNfb3V2ZXJ0cyBBUyAoCiAgICBTRUxFQ1QKICAgICAgY29tcGFueV9jb2RlICwKICAgICAgc3RvcmVfaWQsCiAgICAgIHN0b3JlX2xhYmVsLAogICAgICBTVF9HRU9HUE9JTlQoIGNhc3QobGF0aXR1ZGUgYXMgbnVtZXJpYyksCiAgICAgICAgY2FzdChsb25naXR1ZGUgYXMgbnVtZXJpYykpIEFTIGNvbnRhY3RfaW5mb3JtYXRpb25fc3RvcmUKICAgIEZST00KICAgICAgYGZkLWlvLWRsay1qdWxlcy5kbGtfanVsZXNfcGRhLnN0b3Jlc2AKICAgIFdIRVJFCiAgICAgIHN0YXR1c19pZCA9ICcyJwogICAgICBBTkQgY291bnRyeV9pZCA9ICdGUkEnCiAgICAgIEFORCBjYXN0KGxhdGl0dWRlIGFzIG51bWVyaWMpIDw+IDAKICAgICAgQU5EIGNvbXBhbnlfY29kZSBJTiAgKCdKdWxlcycsJ0JyaWNlJywKICAgICAgICAnQml6emJlZScpICApCiAgICAjIGNvb3Jkb25uw4PCqWVzIGRlcyBjb21tdW5lcwogICAgLAogICAgY29tbXVuZXMgQVMoCiAgICBTRUxFQ1QKICAgICAgbm9tX2NvbW11bmUsCiAgICAgIGNvZGVwb3N0YWwsCiAgICAgIGNvb3Jkb25uZWVzIEFTIGNvb3Jkb25uZXNfY29tbXVuZQogICAgRlJPTQogICAgICBgZGxrX21hbnVhbF9wc2EuY29vcmRvbm5lZXNfY29tbXVuZXNgICkKICAgICMgQ2FsY3VsIGRlIGRpc3RhbmNlIGVudHJlIGxlcyBjb21tdW5lcyBldCBsZXMgbWFnYXNpbnMgb3V2ZXJ0cwogICAgLAogICAgZGlzdGFuY2VzIEFTKAogICAgU0VMRUNUCiAgICAgIGMuKiwKICAgICAgbS4qLAogICAgICBTVF9ESVNUQU5DRShjb29yZG9ubmVzX2NvbW11bmUsCiAgICAgICAgY29udGFjdF9pbmZvcm1hdGlvbl9zdG9yZSkvMTAwMCBBUyBkaXN0YW5jZQogICAgRlJPTQogICAgICBjb21tdW5lcyBjCiAgICBMRUZUIEpPSU4KICAgICAgbWFnYXNpbnNfb3V2ZXJ0cyBtCiAgICBPTgogICAgICAxPTEgKQogICAgIyBDcsODwqlhdGlvbiBkJ3VuIGNsYXNzZW1lbnQgZGUgZGlzdGFuY2UgZHUgbWFnYXNpbiBsZSBwbHVzIHByb2NoZSBwYXIgZW5zZWluZ2UgcG91ciBjaGFxdWUgdmlsbGUKICAgICwKICAgIGRpc3RhbmNlMSBBUyAoCiAgICBTRUxFQ1QKICAgICAgKiwKICAgICAgUkFOSygpIE9WRVIgKFBBUlRJVElPTiBCWSBjb2RlcG9zdGFsLGNvbXBhbnlfY29kZSBPUkRFUiBCWSBkaXN0YW5jZSkgQVMgcmFuZwogICAgRlJPTQogICAgICBkaXN0YW5jZXMgKQogICAgIyBTw4PCqWxlY3Rpb24gZHUgbWFnYXNpbiBsZSBwbHVzIHByb2NoZSBkZSBjaGFxdWUgdmlsbGUgcGFyIGVuc2VpZ25lCiAgU0VMRUNUCiAgICBub21fY29tbXVuZSwKICAgIGNvZGVwb3N0YWwsCiAgICBBUlJBWV9BR0coU1RSVUNUIChjb21wYW55X2NvZGUsCiAgICAgICAgc3RvcmVfaWQsCiAgICAgICAgc3RvcmVfbGFiZWwsCiAgICAgICAgY29udGFjdF9pbmZvcm1hdGlvbl9zdG9yZSwKICAgICAgICBkaXN0YW5jZSkpIEFTIGNsb3Nlcl9zdG9yZQogIEZST00KICAgIGRpc3RhbmNlMQogIFdIRVJFCiAgICByYW5nID0gMQogIEdST1VQIEJZCiAgICBub21fY29tbXVuZSwKICAgIGNvZGVwb3N0YWwKICBPUkRFUiBCWQogICAgY29kZXBvc3RhbAogLS0gKQ=="
          }
        };
      }
    },
    dagConf: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    prepareSQL(sqlFile) {
      let sql = "";
      if (sqlFile._binaryString !== undefined) {
        try {
          sql = Base64.decode(sqlFile._binaryString);
        } catch (error) {
          sql = "No SQL Found";
          console.log(error);
        }
      } else {
        sql = sqlFile;
      }
      return sql;
    }
  },
  computed: {
    dagContext() {
      //make a deep copy of the dagConf
      let dagContext = JSON.parse(JSON.stringify(this.dagConf));
      let keyToDelete = "workflow";
      delete dagContext[keyToDelete];
      return dagContext;
    },
    tasksFull() {
      let i;
      let tasksFull = this.tasksConf;
      for (i = 0; i < tasksFull.length; i++) {
        switch (tasksFull[i].task_type) {
          case "create_gbq_table":
            break;
          case "copy_gbq_table":
            break;
          case "sql":
            //extract the SQL filename to find the binary SQL present in the tasksSql Object
            tasksFull[i].sql = this.prepareSQL(this.tasksSQL[tasksFull[i].id]);
            break;
          default:
            tasksFull[i].task_type = "sql";
            //extract the binary SQL present in the tasksSql Object
            tasksFull[i].sql = this.prepareSQL(this.tasksSQL[tasksFull[i].id]);
        }
      }
      return tasksFull;
    }
  }
};
</script>

<style lang="scss" scoped></style>
