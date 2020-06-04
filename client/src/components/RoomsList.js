import React from 'react';
import RoomListItem from './RoomListItem';
import Cable from 'actioncable';
import { Link } from 'react-router-dom';

class Rooms extends React.Component {
    state = {
        rooms: [],
        newForm: false
    }

    //websockets handlers
    handleData(data){
        if (data.type === 'current_rooms'){
            this.setState({
                rooms: data.rooms
            })
        } else if (data.type === 'new_room'){
            this.setState(prevState => ({
                rooms: [...prevState.rooms, data.room]
            }))
        }
        
    }

    // lifecycle hooks
    componentDidMount(){
        this.cable = Cable.createConsumer(`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`);

        this.subscription = this.cable.subscriptions.create({
            channel: 'RoomsListChannel'
          }, {
            connected: () => {},
            disconnected: () => {},
            received: (data) => {
                console.log(data);
                this.handleData(data);
            },
        });
    }

    componentWillUnmount(){
        this.cable.subscriptions.remove(this.subscription);
    }
    
    //component handlers
    changeHandler = event => {
        this.setState({
            name: event.target.value
        })
    }

    clickHandler = () => {
        this.props.logOut(this.props.history)
    }

    renderRooms = () => (this.state.rooms.map((room) => <RoomListItem key={room.id} room={room} wsSubscribeRoom={this.props.wsSubscribeRoom}/>))

    render () {
        return (
            <div>
                Rooms<br/>
                <Link to="/rooms/new">Create Room</Link>
                <ul>
                    {this.renderRooms()}
                </ul>
                <button onClick={this.clickHandler}>Log Out</button>
            </div>
        )
    }
}

export default Rooms