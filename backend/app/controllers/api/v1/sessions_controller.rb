module Api
	module V1
		class SessionsCOntroller < ApplicationController
			def create
				@user = User.find_by(email_address: session_params[:email_address])

				if @user && @user.authenticate(session_params[:password])
					login!
					render json: {
						logged_in: true,
						user: @user
					}
				else
					render json: {
						status: 401,
						error: ['user not found']
					}
				end
			end

			def is_logged_in?
				if logged_in? && current_user
					render json: {
						logged_in: true,
						user: current_user
					}
				else
					render json: {
						logged_in: false,
						message: 'no such user'
					}
				end
			end

			def destroy
				logout!
				render json: {
					status: 200,
					logged_out: true
				}
			end

			private

			def session_params
				params.require(:user).permit(:email_address, :password)
			end
		end
	end
end