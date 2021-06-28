module Api
  module V1
    class OrganisationsController < ApplicationController
      def index
        organisations = Organisation.all

        render json: OrganisationSerializer.new(organisations).serializable_hash.to_json
      end

      def create
        organisation = Organisation.new(organisation_params)

        if organisation.save
          render json: OrganisationSerializer.new(organisations).serializable_hash.to_json
        else
          render json: { error: organisation.errors.messages }, status: 422
        end
      end

      def update
        organisation = Organisation.find_by(id: params[:id])

        if organisation.update(organisation_params)
          render json: OrganisationSerializer.new(organisations).serializable_hash.to_json
        else
          render json: { error: organisation.errors.messages }, status: 422
        end
      end

      def destroy
        organisation = Organisation.find_by(id: params[:id])

        if organisation.destroy
          head :no_content
        else
          render json: { error: organisation.errors.messages }, status: 422
        end
      end

      # implement search by keyword soon
      # def find
      #   organisation = Organisation.find_by()

      #   render json: OrganisationSerializer.new(organisations).serialized_json

      private

      def organisation_params
        params.require(:organisation).permit(:name, :hourly_rate)
      end
    end
  end
end