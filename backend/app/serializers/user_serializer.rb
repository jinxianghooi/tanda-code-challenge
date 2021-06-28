class UserSerializer
  include JSONAPI::Serializer
  attributes :name, :email_address, :organisation_id

  has_many :shifts
end
