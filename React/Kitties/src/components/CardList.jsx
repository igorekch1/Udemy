import React, {Component} from "react";
import Card from "./Card";

const CardList = ({cats}) => {

    return ( 
        <div>
            { 
                cats.map((cat,i) => {
                    return <Card 
                                key={i} 
                                id={cats[i].id} 
                                name={cat.name} 
                                email={cat.email}
                            />
                })
            }
        </div>
    )
}

export default CardList;