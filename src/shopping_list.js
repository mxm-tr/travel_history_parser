import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class ShoppingItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: 1,
            name: props.name
        }
    }
    increase_quantity(){
        this.setState({quantity: this.state.quantity + 1 });
    }
    render(){
        return(
            <li>
                <label>{this.state.quantity}</label>
                <label>{this.state.name}</label>
                <button onClick={() => {this.increase_quantity()}}> Add </button>
            </li>
        )
    }
}

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingItemNames: [],
            newShoppingItemName: 'poop'
        };
        this.handleAddNewShoppingItem = this.handleAddNewShoppingItem.bind(this)
        this.handleNewShoppingItemNameChange = this.handleNewShoppingItemNameChange.bind(this);
      }
    
    handleNewShoppingItemNameChange(event) {
        this.setState({newShoppingItemName: event.target.value});
    }

    handleAddNewShoppingItem(event){
        const shoppingItemNames = this.state.shoppingItemNames.slice();
        this.setState(
            {
                shoppingItemNames: shoppingItemNames.concat([this.state.newShoppingItemName])
            }
        );
        event.preventDefault();
    }

    render() {
      return (
        <div>
        <form onSubmit={this.handleAddNewShoppingItem} >
            <input type='text' name='newShoppingItemName' value={this.state.newShoppingItemName} onChange={this.handleNewShoppingItemNameChange} />
            <button type='submit' >Add item</button>
        </form>
        <div className="shopping-list">
              <h1>Shopping List for {this.props.name}</h1>
                <ul>{this.state.shoppingItemNames.map(
                        (shoppingItemName) =>
                            <ShoppingItem key={shoppingItemName.toString()} name={shoppingItemName} />
                )}
                </ul>
            </div>
        </div>
      );
    }
  }
  
  
// ========================================

ReactDOM.render(
    <div>
        <ShoppingList name="LoL"/>
    </div>,
    document.getElementById('root')
  );