class User < ApplicationRecord
  has_many :shifts
  belongs_to :organisation
end
