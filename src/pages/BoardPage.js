import React, { useContext } from "react";
import { Context } from "..";

const BoardPage = () => {
    const {user} = useContext(Context);

    return (
        <div>
            BoardPage
        </div>
    )
}

export default BoardPage