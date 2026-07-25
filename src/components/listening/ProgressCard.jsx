export default function ProgressCard({

answered,

total,

}){

const percentage=

Math.round(

answered/total*100

);

return(

<div className="progress-card">

<h3>

Progress

</h3>

<h1>

{answered}/{total}

</h1>

<div className="progress">

<div

className="fill"

style={{

width:`${percentage}%`

}}

>

</div>

</div>

<p>

{percentage}% Complete

</p>

</div>

);

}