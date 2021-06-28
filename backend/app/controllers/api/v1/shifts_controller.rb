module Api
  module V1
    class ShiftsController < ApplicationController
      def create
        shift = Shift.new(shift_params)

        if shift.save
          render json: ShiftSerializer.new(shift).serializable_hash.to_json
        else
          render json: { error: shift.errors.messages }, status: 422
        end
      end

      def update
        shift = Shift.find_by(id: params[:id])

        if shift.save
          render json: ShiftSerializer.new(shift).serializable_hash.to_json
        else
          render json: { error: shift.errors.messages }, status: 422
        end
      end
      end

      def destroy
        shift = Shift.find_by(id: params[:id])

        if shift.destroy
          head :no_content
        else
          render json: { error: shift.errors.messages }, status: 422
        end
      end

      private

      def shift_params
        params.require(:shift).permit(:start, :finish, :break_length, :user_id)
      end
    end
  end
end