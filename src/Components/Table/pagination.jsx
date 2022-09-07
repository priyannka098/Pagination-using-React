import React,{useState,useEffect} from "react";
import "./pagination.css";

import { useTable } from 'react-table';

function Pagination(){
       const[data,setData]=useState([]);
       const[skipCount,setSkipCount]=useState(0);
       const[recordsCount,setRecordsCount]=useState(0);
       const[numberOfPages,setNumberOfPages]=useState(0);
       const[currentPage,setCurrentPage]=useState(1);
       
      

       const fetchPost = () =>{
        let API='https://dummyjson.com/products?skip='+skipCount+'&limit=10';
            fetch(API)
            .then((abc)=>abc.json())
            .then ((res)=> {
                setRecordsCount(res.total);
                console.log(recordsCount);   //to count total rows
                setData(res.products);
                console.log("data: "+data);
                //console.log(res);
            })
        }
    

        useEffect(() => {
            fetchPost();
          },[skipCount]);

    const ShowPage =(event)=>{
    const val=event.target.id; //to get clicked page
    setSkipCount((val-1)*10);
    console.log(skipCount);
    fetchPost();
}


    return(
        <div className="table-div">
        <h1>Product Details</h1>
        <div className="table-box">
        <table>
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Brand</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Rating</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
            </tr>
            </thead>

            <tbody>
                {data.map(item=>(
                <tr key={item.id}>
                 <td>{item.id}</td>   
                <td>{item.brand}</td>
                <td>{item.title}</td>
                <td>{item.price} </td>
                <td>{item.rating} </td>
                <td>{item.category }</td>
                <td><img className="image" src={item.thumbnail}></img> </td>

                </tr>
            
               ) )}
            </tbody>
          </table>
          </div>
          <div className="buttons-div">
           { Array(Math.ceil(recordsCount/10 )).fill(0).map((element,index)=>(

            <button className="Buttons"  id={index+1}  onClick={ShowPage}>{index+1}</button>
           )
          ) }
          </div>

            

     </div>
    )


}
export default Pagination;


