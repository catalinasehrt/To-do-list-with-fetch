import React,{useState} from "react";
import { useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState([]);
	
    const deleteTarea = (i) => {
        setTarea(
            tarea.filter((value, index) => {
                return index != i;
            })
        );
    };

    function putApi() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(tarea);

        var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		  };
		  
		  fetch("https://assets.breatheco.de/apis/fake/todos/user/catalinadali", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
    }

    useEffect(() => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/catalinadali")
            .then((respuesta) => respuesta.json())
            .then((data) => setTarea(data));
    }, []);

    useEffect(() => {
        putApi();
    }, [tarea])

    return (
        <div className="col-5 container m-5">
            <h1> ✨Lista de Deberes📄 </h1>
            <input
                placeholder="nueva tarea"
                onKeyPress={(event) => {
                    if (event.key == "Enter") {
                        setTarea([...tarea, { label: event.target.value, done: false }]);
                        event.target.value = "";
                    }
                }}
            />

            {tarea.map((value, index, i) => {
                return (
                    <div className="container text-center">
                        <div className="task-name" key={index}>
                            {value.label}
                        </div>
                        <div className="button-container">
                            <button
                                className="delete-button"
                                onClick={() => deleteTarea(index)}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                );
            })}
            
        </div>
    );
};
	
	
export default Home;