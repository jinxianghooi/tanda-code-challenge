class ShiftsChangeColumnNotNull < ActiveRecord::Migration[6.1]
  def change
    change_column_null :shifts, :user_id, false
    change_column_null :shifts, :organisation_id, false
  end
end
