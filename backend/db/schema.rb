# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_02_040557) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "organisations", force: :cascade do |t|
    t.string "name"
    t.integer "hourly_rate"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "shifts", force: :cascade do |t|
    t.datetime "start"
    t.datetime "finish"
    t.integer "break_length"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "organisation_id", null: false
    t.index ["organisation_id"], name: "index_shifts_on_organisation_id"
    t.index ["user_id"], name: "index_shifts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email_address"
    t.string "password_digest"
    t.bigint "organisation_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["organisation_id"], name: "index_users_on_organisation_id"
  end

  add_foreign_key "shifts", "organisations"
  add_foreign_key "shifts", "users"
  add_foreign_key "users", "organisations"
end
