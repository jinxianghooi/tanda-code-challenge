class ShiftSerializer
  include JSONAPI::Serializer
  attributes :start, :finish, :break_length, :user_id
end
