
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../API/BooksAPI';
import Book from './Book';

 class SearchBook extends Component {
     
    state = {
            
            result : []
        }
componentDidMount (){
    BooksAPI.getAll().then((result ) =>{
        this.setState({ result } )
    })
}

       constructor(props) {
       super(props);
       this.SearchMethod = this.SearchMethod.bind(this);
        }
   // search method to find matched books   
    SearchMethod(event){
        const books = this.props.books;
         if (event.target.value !== '') { 
         BooksAPI.search(event.target.value).then((result ) => {
            if (!result  || result .error) {
              this.setState({ result : [] })
              return
            }
            result  = result.map((book) => {
               
                if (books.find(c => c.id === book.id)) {
                    book.shelf = books.find(c => c.id === book.id).shelf;
                   
                }
                else {
                book.shelf='none'
              }
                return book;
            });
            this.setState({ result });
        });
    }
    else {
        this.setState({result : []})
    }
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.SearchMethod}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.result.map(bookResult => (
                            <li key={bookResult.id}>
                                <Book book={bookResult} ChangeShelf={this.props.ChangeShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}
export default SearchBook