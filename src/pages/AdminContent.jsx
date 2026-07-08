import { useNavigate } from "react-router-dom";

export default function AdminContent() {

const navigate = useNavigate();

const cards = [

{
  title:"Reading Tests",
  emoji:"📖",
  route:"/admin/tests/reading",
},

{
  title:"Listening Tests",
  emoji:"🎧",
  route:"/admin/tests/listening",
},

{
  title:"Writing Tests",
  emoji:"✍️",
  route:"/admin/tests/writing",
},

{
  title:"Speaking Tests",
  emoji:"🎤",
  route:"/admin/tests/speaking",
},

{
  title:"Users",
  emoji:"👥",
  route:"/admin/users",
},

{
  title:"Payments",
  emoji:"💳",
  route:"/admin/payments",
},

{
  title:"Notifications",
  emoji:"🔔",
  route:"/admin/notifications",
},

];

return(

<div
style={{
maxWidth:"1200px",
margin:"0 auto",
padding:"40px",
}}
>

<h1>

Content Management

</h1>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:"25px",
marginTop:"40px",
}}
>

{cards.map(card=>(

<div

key={card.title}

onClick={()=>
navigate(card.route)
}

style={{

background:"#fff",

padding:"35px",

borderRadius:"22px",

cursor:"pointer",

boxShadow:"0 10px 30px rgba(0,0,0,.08)",

transition:".3s"

}}

>

<div
style={{
fontSize:"52px",
}}
>

{card.emoji}

</div>

<h2>

{card.title}

</h2>

</div>

))}

</div>

</div>

);

}