class Shift < ApplicationRecord
  belongs_to :organisation, optional: false
  belongs_to :user, optional: false
end
