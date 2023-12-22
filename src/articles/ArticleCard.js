import React from 'react';

function ArticleCard(props){
    const data = props.data;
    return (
        <div className='articleCard'>
            <div className='container'>
                <div>
                    <h1>{data.title}</h1>
                    <h3>{data.date}</h3>
                    <p>blah blah blah blah</p>
                </div>
            </div>
        </div>
    );
}
//<img className="cover"src={"\\" + data.cover}></img>
export default ArticleCard;