import "../../styles/listening/ListeningHeader.css";
export default function ListeningHeader({

title,

section,

totalSections,

}){

return(

<header className="listening-header">

<div>

<h1>

{title}

</h1>

<p>

Section {section} of {totalSections}

</p>

</div>

<div className="logo">

KNARROW

</div>

</header>

);

}