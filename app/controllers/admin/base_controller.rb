module Admin
  class BaseController < ApplicationController
    before_action :authenticate_user!
    before_action :check_admin

    private

    def check_admin
      unless current_user&.admin?
        redirect_to root_path, alert: "管理者権限が必要です"
      end
    end
  end
end
