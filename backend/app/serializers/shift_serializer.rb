class ShiftSerializer
  include JSONAPI::Serializer
  attributes :start, :finish, :break_length, :organisation_id, :user_id

  # belongs_to :user
end
