import React,{useState} from "react";
import { useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState([]);
	
	
				
				function putApi() {
					var myHeaders = new Headers();
					myHeaders.append("Content-Type", "application/json");
					
					var raw = JSON.stringify(tarea);
					
					var requestOptions = {
					  method: 'PUT',
					  headers: myHeaders,
					  body: raw,
					  redirect: 'follow'
					};
					
					fetch("https://assets.breatheco.de/apis/fake/todos/user/catas", requestOptions)
					  .then(response => response.text())
					  .then(result => console.log(result))
					  .catch(error => console.log('error', error));

				}
			
			
         useEffect(()=>{
              fetch("https://assets.breatheco.de/apis/fake/todos/user/catas")
             .then((response)=>response.json())
              .then((data)=>Settarea(data));
            },[]);

             useEffect(()=>{ 
             putApi();
            },[tarea]);

			return (
				<div className="text-center text-info m-5">
					
					<h1> ✨ Lista deberes 📝</h1> 
		
					<form onSubmit={(event) =>{
						event.preventDefault ();
						setTarea([...tarea,event.target[0].value])
						event.target[0].value = "";
		
					}}>
		
		
					<input placeholder="Nueva Tarea"/> 
					</form>
					<div className="list-group container col-4" >
					{tarea.map ((value, index, arr) =>{
						return <li key={index}>{value} <button onClick={()=>setTarea(tarea.filter((item, idx)=> idx !== index)  )}>🗑</button> </li>
		
						} )	
						}
 	


			</div>

			

		</div>
	);
};

export default Home;
