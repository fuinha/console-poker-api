import React from 'react';
import CheckoutForm from './CheckoutForm'
import CurrencyInput from 'react-currency-input';
import { connect } from 'react-redux';
import { addChips } from '../redux/dispatchActions';
import { fetchWithToken } from '../utilities/fetchWithToken';

class CheckoutContainer extends React.Component{
    state = {
        chips: 0,
        amount: 0
    }

    componentDidMount() {
        // get user's current amount.
        fetchWithToken(`http://localhost:3001/users/get_chips`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
            })
    }

    changeHandler = event => {
        this.setState({
            amount: event.target.value
        })
    }

    render(){
        return(
            <div>
                1 USD = 10000 Chips<br/>
                <label>
                $<CurrencyInput value={this.state.amount} onChangeEvent={this.changeHandler}/>
                </label>
                <CheckoutForm amount={this.state.amount} addChips={this.props.addChips}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addChips: amount => dispatch(addChips(amount))
    }
}

export default connect(null, mapDispatchToProps)(CheckoutContainer);