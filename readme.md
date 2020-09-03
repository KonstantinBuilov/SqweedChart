# SqweedChart
 Simple library for drawing svg charts.
 Supports bar, line and ring charts.

 Usage:  
 -append SqweedChart.js in script section  
 -create new instance in script like "const chart = new SqweedChart(parentId, options, data)".  
 Where: parentId - id of block in which chart will be rendered.  
 options - object with options like  
{  
    type: bar|line|ring, default bar,  
    background: any css color, default white,  
    text: any css color, default black,  
    border: any css border, default 1px solid black  
}  
data - array of objects with structure like  
{   
    name: any string, could be empty,  
    value: any number, could be empty,  
    color: any css color, could be empty  
}  
Example see in index.html  
Feel free to use it and edit it in your way.  