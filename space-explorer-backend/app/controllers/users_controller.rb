class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, include: [:character]
    end

    def show
        user = User.find(params[:id])
        render json: user, include: [:character]
    end

    def create
        user = User.new(id: params[:id], name: params[:name], character_id: params[:character_id])
        render json: user, include: [:character]
    end


    def update
        
    end

    def destroy
        
    end




end
