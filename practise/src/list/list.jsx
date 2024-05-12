import PropTypes from 'prop-types'

function List(props){

    // const fruits = [{name: "apple", calories: 95},
    //                 {name:"orange", calories: 45}, 
    //                 {name:"banana", calories: 105}, 
    //                 {name:"coconut", calories: 159}, 
    //                 {name:"pineapple", calories: 37}];

    // fruits.sort((a, b) => a.name.localeCompare(b.name)); Normal Alphabetical
    // fruits.sort((a, b) => a.name.localeCompare(b.name)); Reverse Alphabetical
    // fruits.sort((a, b) => b.calories - a.calories); Descending
    // fruits.sort((a, b) => a.calories - b.calories);

    // const lowCalFruits = fruits.filter(fruit => fruit.calories < 100);

    // const listItems = lowCalFruits.map(fruit => <li key={fruit.name}>{fruit.name}
    //                                                         : &nbsp; <b>{fruit.calories}</b></li>);

    // const highCalFruits = fruits.filter(fruit => fruit.calories >= 100);

    // const listItems = highCalFruits.map(fruit => <li key={fruit.name}>{fruit.name}
    //                                                         : &nbsp; <b>{fruit.calories}</b></li>);

    // const listItems = fruits.map(fruit => <li key={fruit.name}>{fruit.name}
    //                                                         : &nbsp; <b>{fruit.calories}</b></li>);

    const category = props.category;

    const itemList = props.items;

    const listItems = itemList.map(fruit => <li key={fruit.id}>{fruit.name}
                                                            : &nbsp; <b>{fruit.calories}</b></li>);

    return(
        <>
            <h3 className="listCategory">{category}</h3>
            <ul className="listItems">{listItems}</ul>
        </>
        
    );
}

List.defaultProps = {
    category: "Category",
    items: [],
}

List.propTypes = {
    category: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number,
                                            name: PropTypes.string,
                                            calories: PropTypes.number,

     }))
}

export default List