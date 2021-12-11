import React, { Dispatch, SetStateAction } from 'react'
import { BookmarkItemInterface } from '../Interfaces'

interface FunctionProps {
    item: BookmarkItemInterface
    setMyBookmarkDeleteItem: Dispatch<SetStateAction<BookmarkItemInterface | null>>
    setMyBookmarkModalToggleConfirm: Dispatch<SetStateAction<boolean>>
}

export const handleOnclickDeleteBookmark = ({item, setMyBookmarkDeleteItem, setMyBookmarkModalToggleConfirm} : FunctionProps) => {
        setMyBookmarkDeleteItem(item)
        setMyBookmarkModalToggleConfirm(true)
    }
