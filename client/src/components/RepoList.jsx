import React from 'react';

const RepoList = (props) => (
  <div>
  <h4> There are {props.repos.length} repos.</h4>
  {props.repos.map(function(item, idx){
     return (<p className="border" key={idx}> {item.url} <br/> {item._id} <br/> {item.name} <br/> {item.description} </p>)
   })}
  </div>
)
export default RepoList;