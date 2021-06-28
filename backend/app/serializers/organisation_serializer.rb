class OrganisationSerializer
  include JSONAPI::Serializer
  attributes :name, :hourly_rate

  has_many :users
end
