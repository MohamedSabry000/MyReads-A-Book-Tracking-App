import React from 'react'
import * as BooksAPI from './API/BooksAPI'
import './App.css'
import ListBook from "./components/ListBook";
import Search from "./components/Search";
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {
   state = {
            books: [],
            showSearchPage: true,
        }
    //Calling it before render method to fill books state
    componentDidMount() {
         this.FillBookList();
    }


//fill app state with books data
    FillBookList() {
           BooksAPI.getAll().then(books => {
            this.setState({books: books,showSearchPage: false})
        });
       }

       constructor(props) {
        super(props);
       this.ChangeShelf = this.ChangeShelf.bind(this);
        }

//book update
    ChangeShelf(book, shelf){
        BooksAPI.update(book, shelf)
            .then(this.setState((state) => ({
                    books: state.books.map(c => {
                        while (c.title === book.title) {
                            c.shelf = shelf;
                            return c
                        }
                            return c

                    }),
                   showSearchPage: false
                }))
            )
    };

  ChangeShelf(book, shelf){
        BooksAPI.update(book, shelf).then(() => this.setState((state) => {
                book.shelf = shelf
                const newBooks = state.books.filter(bookOnState => book.id !== bookOnState.id).concat(book)
                return { books: newBooks }
            })
            )
    };

    render() {
        const state = this.state;
        const currentlyReading = state.books.filter((book) => book.shelf === 'currentlyReading')
        const wantToRead = state.books.filter((book) => book.shelf === 'wantToRead')
        const read = state.books.filter((book) => book.shelf === 'read')

       return (
            <div className="app">
                <Route path="/" exact render={() => (
                    <div>
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        {
                            !this.state.showSearchPage ? (
                                //pass data to listbook
                                <ListBook
                                    cReading={currentlyReading}
                                    wRead={wantToRead}
                                    read={read}
                                    ChangeShelf={this.ChangeShelf}
                                />
                            ) : (
                                <div className="loading"/>
                            )
                        }
                    </div>
                )}/>


                <Route path="/search" render={({h}) => (
                    <Search ChangeShelf={this.ChangeShelf} h={h} books={this.state.books.filter((book) => book.shelf === 'currentlyReading').concat(this.state.books.filter((book) => book.shelf === 'wantToRead'),
                            this.state.books.filter((book) => book.shelf === 'read') )}
                    />

                )}/>
            </div>
        )
    }

}
export default BooksApp
