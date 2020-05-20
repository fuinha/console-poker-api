class ApplicationController < ActionController::Base
    before_action :authenticate_request
    skip_before_action :verify_authenticity_token

    attr_reader :current_user

    private
    
    def authenticate_request
        @current_user = AuthorizeApiRequest.call(request.headers).result
        render json: { error: 'Not Authorized' }, statuss: 401 unless @current_user
    end
end
