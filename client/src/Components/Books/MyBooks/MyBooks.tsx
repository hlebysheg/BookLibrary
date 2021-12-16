import React, {ChangeEvent, useState} from "react";
import BK from './Books.module.scss';
import {IbookComponent, MyBookPage} from "../../../interface/componentInterface";
import BookPostContainer from "../bookPost/BookPostContainer";

export const MyBooks: React.FC<MyBookPage> = ({booksCollection}: MyBookPage) => {


    const bookArea = booksCollection.map((el, id) => {

        return <BookPostContainer book={el} key={el._id + ' '+ id} id = {el._id}/>

    })


    return (
        <div>
            {/*{books}*/}
            <div className={BK.container}>
                {bookArea}
            </div>
            {/*<LinkArea bookNumber={bookNumber} pageSize={pageSize}/>*/}
        </div>

    )
}
