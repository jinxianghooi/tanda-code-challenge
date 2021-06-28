module Api
  module V1
    class UsersController < ApplicationController
      def create
        user = User.new(user_params)

        if user.save
          render json: UserSerializer.new(user).serializable_hash.to_json
        else
          render json: { error: user.errors.messages }, status: 422
        end
      end

      def update
        user = User.find_by(id: params[:id])

        if user.update(user_params)
          render json: UserSerializer.new(user).serializable_hash.to_json
        else
          render json: { error: user.errors.messages }, status: 422
        end
      end

      def destroy
        user = User.find_by(id: params[:id])

        if user.destroy
          head :no_content
        else
          render json: { error: user.errors.messages }, status: 422
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email_address, :password, :organisation_id)
      end
    end
  end
end