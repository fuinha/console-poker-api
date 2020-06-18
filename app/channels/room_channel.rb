require 'pry'

class RoomChannel < ApplicationCable::Channel
  attr_accessor :room, :user
  
  def subscribed
    stream_from "room_#{params["room"]}"
    @user = find_verified_user
    @room = Room.find(params["room"])
    @room.users << @user
    @user.save

    ActionCable.server.broadcast("room_#{@room.id}", { type: "current_room", room: @room })
  end

  def create_message(data)
    m = Message.create(payload: data["content"], user: @user, chatbox: @room.chatbox)
    
    ActionCable.server.broadcast("room_#{@room.id}", {type: "new_message", message: m})
  end

  def set_user(data)
    puts data
  end

  def unsubscribed
    puts "I UNSUBSCRIBED!!"
    @room.users.delete(@user)
    @user.save

    ActionCable.server.broadcast("room_#{@room.id}", { type: "current_room", room: @room })
    stop_all_streams
  end

  private
    def find_verified_user 
      if current_user = User.find(JWT.decode(params['token'], Rails.application.secrets.secret_key_base)[0]["user_id"])
        current_user
      else
        reject
      end
    end
end
