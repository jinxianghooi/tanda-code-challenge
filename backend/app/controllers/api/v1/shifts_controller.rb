module Api
  module V1
    class ShiftsController < ApplicationController
      def index
        # not sure if this is the right way to do it but it works
        if params[:organisation_id]
          shifts = Shift.where(organisation_id: params[:organisation_id]).all
        elsif params[:user_id]
          shifts = Shift.where(user_id: params[:user_id]).all
        else
          render json: {
						error: ['forbidden path']
					}, status: 403
          return;
        # else
        #   shifts = Shift.all 
        end
        
        render json: ShiftSerializer.new(shifts).serializable_hash.to_json

      def create
        shift = Shift.new(shift_params)

        if shift.save
          render json: ShiftSerializer.new(shift).serializable_hash.to_json
        else
          render json: { error: shift.errors.messages }, status: 422
        end
      end

      def update
        shift = Shift.find(params[:id])

        if shift.save
          render json: ShiftSerializer.new(shift).serializable_hash.to_json
        else
          render json: { error: shift.errors.messages }, status: 422
        end
      end
      end

      def destroy
        shift = Shift.find(params[:id])

        if shift.destroy
          head :no_content
        else
          render json: { error: shift.errors.messages }, status: 422
        end
      end

      private

      def shift_params
        params.require(:shift).permit(:start, :finish, :break_length, :organisation_id, :user_id)
      end
    end
  end
end