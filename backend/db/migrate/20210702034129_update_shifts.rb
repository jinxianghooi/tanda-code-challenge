class UpdateShifts < ActiveRecord::Migration[6.1]
  def change
    change_table :shifts do |t|
      t.belongs_to :organisation, null: true, foreign_key: true
    end
  end
end
