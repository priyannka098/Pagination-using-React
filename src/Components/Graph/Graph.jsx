// import { Chart, Tooltip, Axis, Point, Legend, Coord, SmoothLine } from 'viser-react';
import React,{useState,useEffect} from "react";
import { Chart } from '@antv/g2';
import './Chart.css'
function Graph() {


//   const scale = [{
//     dataKey: 'percent',
//     range: [0,1]
//   }];

//   const fetchPost = () =>{
//     let API='https://dummyjson.com/products?limit=100';
//         fetch(API)
//         .then((abc)=>abc.json())
//         .then ((res)=> {
//             setData(res.products);
//             console.log("data: "+data);
//             //console.log(res);
//         })
//     }


const initChart= ()=>{
    fetch('https://dummyjson.com/products?limit=100')
  .then(res => res.json())
  .then(data => {
    data.products.forEach(obj => {
      obj.type = '1';
    });
    //setData(data.products);
    console.log("rendering graph");
    const chart = new Chart({
      container: 'root',
      autoFit: true,
      height: 500,
      padding: [40, 100, 80, 80]
    });
    chart.data(data.products);
    chart.scale('type', {
      range: [0, 1]
    });
    chart.coordinate('polar');
    chart.legend(false);
    chart.axis('price', {
      grid: {
        alignTick: true,
      },
    });
    chart
      .point()
      .adjust('jitter')
      .position('price*type')
      .color('price')
      .tooltip("title*price*rating")
      .shape('circle')
      .style({
        fillOpacity: 0.85,
      });
      chart.removeView();
      chart.render();
    });
}

  return (
    <div className="graph-div">
        <h1>Price Distribution of All Products</h1>
        {initChart()}
    </div>
//     <div>
//     <Chart forceFit height={400} data={data} scale={scale}>
//       <SmoothLine position="price*percentage" color="city" size="2" />
//       <Tooltip />
//       <Legend />
//       <Axis />
//     </Chart>
//   </div>

    //   <Chart forceFit height={400} data={data} scale={scale}>
    //     <Legend reversed />
    //     <Coord type="polar" direction="RT"/>
    //     <Tooltip
    //       crosshairs= {{ type: 'cross' }}
    //     />

    //     <Axis
    //       dataKey="price"
         
    //       grid={{
    //         align: 'center',
    //         lineStyle: {
    //           stroke: '#8C8C8C',
    //           lineWidth: 1,
    //           lineDash: [3, 3],
    //         },
    //       }}
    //     />
    //     <Point
    //       position="percent*price"
    //       color="Grade"
    //       adjust="jitter"
    //       size={4}
    //       opacity={0.65}
    //       shape="circle"
    //     />
    //   </Chart>
    );
}

export default Graph;





