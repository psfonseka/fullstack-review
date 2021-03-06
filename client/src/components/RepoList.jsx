import React from 'react';

const RepoList = (props) => (
  <div>
  <h4> Here are the last {props.repos.length} repos.</h4>
  {props.repos.map(function(item, idx){
     return (
     <p className="border" key={idx}> <a href={item.url}>{item.name}</a> <br/> {item.username} <br/> {item.id} <br/> {item.description} </p>)
   })}
  </div>
)
export default RepoList;