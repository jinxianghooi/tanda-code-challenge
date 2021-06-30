module Api
  module V1
    class UsersController < ApplicationController
      def show
        # user = User.find_by(id: params[:id])
        # render json: UserSerializer.new(user).serializable_hash.to_json
        @user = User.find(params[:id])

        if @user
          render json: @user
        else
          render json: { error: user.errors.messages }, status: 500
        end

      end
      def create
        @user = User.new(user_params)

        if @user.save
          login!
          render json: {
            status: :created,
            user: @user
          }
        else
          render json: { error: user.errors.messages }, status: 500
        end
      end

      def update
        user = User.find_by(id: params[:id])

        if user.update(user_params)
          render json: @user
        else
          render json: { error: user.errors.messages }, status: 500
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
        params.require(:user).permit(:name, :email_address, :password)
      end
    end
  end
end