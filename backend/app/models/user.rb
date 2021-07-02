class User < ApplicationRecord
  has_many :shifts, :through => :shifts
  belongs_to :organisation, optional: true

  has_secure_password
  validates :email_address, presence: true
  validates :email_address, uniqueness: true
end
