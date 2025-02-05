import React, { useContext } from "react";
import { Context } from "..";

const BoardPage = ({tasks}) => {
    const {user} = useContext(Context);
    return (
        <div>
            boardpage
        </div>
    )
}

export default BoardPage