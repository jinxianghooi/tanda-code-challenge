class User < ApplicationRecord
  has_many :shifts
  belongs_to :organisation, optional: true

  has secure_password
  validates :email_address, presence: true
  validates :email_address, uniqueness: true
end
