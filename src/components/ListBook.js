
import React, {Component} from 'react';
import ShelfedBook from './ShelfedBook.js';
import {Link} from 'react-router-dom';

 class ShelfListBook extends Component {
    
    render() {
        
        const wantToRead = this.props.wRead;
        const currentlyReading =this.props.cReading;
        const read = this.props.read

        return (
            <div className="list-books">
                <div className="list-books-content">
                    <div>
                        <ShelfedBook TitleName='Currently Reading' List={currentlyReading} ChangeShelf={this.props.ChangeShelf}/>
                        <ShelfedBook TitleName='Want to Read'  List={wantToRead} ChangeShelf={this.props.ChangeShelf}/>
                        <ShelfedBook TitleName='Read'  List={read} ChangeShelf={this.props.ChangeShelf}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Adding book</Link>
                </div>
            </div>
        );
    }
}
export default  ShelfListBook