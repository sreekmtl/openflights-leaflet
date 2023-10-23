//js file for creating various charts from the data using d3

import * as d3 from "d3";
import {loadRouteData } from "./dataloader";
import "../styles/myStyles.css";

let routes=loadRouteData();

let tot_services=0;
let airline_array=[];
let service_array=[];
let model_array=[];
let data_array=[];


function initialize(cntry){

    tot_services=0;
    airline_array.length=0;
    service_array.length=0;

    cntry=cntry.replace(/"/g, ''); //removing the escape characters

    //i is country code. Get country from it match it with routes.json to get all airline company in that country
    for (let i=0; i<routes.length;i++){
        if(routes[i].airline_country===cntry){
            tot_services+=1;

            if (!airline_array.includes(routes[i].airline_name)){
                airline_array.push(routes[i].airline_name);
                service_array.push(0);
                
            }
            
        }
    }

    //once we get the airline companies, search num of services per company and model from data
    for (let i=0; i<airline_array.length;i++){
        for (let j=0;j<routes.length;j++){
            if(airline_array[i]===routes[j].airline_name){
                service_array[i]+=1;
            }
        }
    }

    console.log(airline_array);
    console.log(service_array);

    console.log("i is ",cntry);

    return tot_services;

}

function servicesChart(cntry,chartDiv){

    //sorting the data before plotting
    for (let i=0;i<service_array.length;i++){
       for (let j=i+1;j<service_array.length;j++){
        if (service_array[i]<service_array[j]){
            let s= service_array[i];
            service_array[i]=service_array[j];
            service_array[j]=s;
            let a= airline_array[i];
            airline_array[i]=airline_array[j];
            airline_array[j]=a;
        }
       }
    }
    
    var svgWidth = 0;

    if (airline_array.length<5){
        svgWidth=100*airline_array.length;
    }else if (airline_array.length>5 && airline_array.length<10){
        svgWidth=50*airline_array.length;
    }else{
        svgWidth=700;
    }

    const svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 120, left: 60 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Creating an SVG element
    const svg = d3.select(chartDiv)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

   
    const chart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Seting up scale scales
    const xScale = d3.scaleBand()
    .domain(airline_array)
    .range([0, width])
    .padding(0.1);
    


    const yScale = d3.scaleLinear()
    .domain([0, d3.max(service_array)])
    .range([height, 0]);

    
    chart.selectAll(".bar")
    .data(airline_array)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("stroke",'black')
    
    .attr("stroke-width",2)
    .attr("x", (d) => xScale(d))
    .attr("y", (d, i) => yScale(service_array[i]))
    .attr("width", xScale.bandwidth()) //xScale.bandwidth()
    .attr("height", (d, i) => height - yScale(service_array[i]));

    // Adding x-axis
    chart.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text")  
    .style("text-anchor", "end") 
    .attr("dx", "-0.5em") 
    .attr("dy", "0.15em") 
    .attr("transform", "rotate(-65)")
    .attr("font-family",'B612');

    // Adding y-axis
    chart.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale))
    .selectAll("text")
    .attr("font-family",'B612');

    // Add labels to the axes
    chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of Services");

    chart.append("text")
    .attr("x", width/2)
    .attr("y", height + margin.top + 100)
    .style("text-anchor", "middle")
    .text("Airlines");
}

export {servicesChart,initialize};


    