class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email_address
      t.string :password_digest
      t.belongs_to :organisation, null: true, foreign_key: true

      t.timestamps
    end
  end
end
