class CharactersController < ApplicationController

    def index
        @characters = Character.all
        render json: @characters        
    end

    def show
        @character = Character.find(params[:id])
        render json: @character
    end

end
