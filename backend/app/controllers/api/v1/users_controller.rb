module Api
  module V1
    class UsersController < ApplicationController
      def index
        @users = User.all()

        if @users
          render json: @users
        else
          render json: { error: "No users found" }, status: 500
        end
      end
      def show
        # user = User.find_by(id: params[:id])
        # render json: UserSerializer.new(user).serializable_hash.to_json
        @user = User.find(params[:id])

        if @user
          render json: @user
        else
          render json: { error: "User not found" }, status: 500
        end

      end
      def create
        if User.exists?(email_address: user_params[:email_address])
          render json:{
            status: :exist
          }, status: 409
          return
        end


        @user = User.new(user_params)

        if @user.save
          login!
          render json: {
            status: :created,
            user: @user
          }
        else
          render json: { error: @user.errors.messages }, status: 500
        end
      end

      def update
        @user = User.find(params[:id])

        if @user.update(user_params)
          render json: {
            updated: true,
            user: @user
          }
        else
          render json: { error: @user.errors.messages }, status: 500
        end
      end

      # def destroy
      #   user = User.find_by(id: params[:id])

      #   if user.destroy
      #     head :no_content
      #   else
      #     render json: { error: user.errors.messages }, status: 500
      #   end
      # end

      private

      def user_params
        params.require(:user).permit(:name, :email_address, :password, :organisation_id)
      end
    end
  end
end