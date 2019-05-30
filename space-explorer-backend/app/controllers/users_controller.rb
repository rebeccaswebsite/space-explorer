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
        user = User.create(name: params[:name], character_id: params[:character_id])
        render json: user, include: [:character]
    end


    def update
        user = User.find(params[:id])
        user.update(character_id: params[:character_id])
        render json: user, include: [:character]
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
    end




end
