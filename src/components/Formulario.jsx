import { useState, useEffect } from "react";

import Error from "./Error";

const Formulario = ({pacientes ,setPacientes, paciente, setPaciente}) => {

    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState("");
    const [sintomas, setSintomas] = useState("");
    const [error, setError] = useState(false);
    
    useEffect(() => {
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setSintomas(paciente.sintomas)
        }
    }, [paciente]);

    const generarId = () =>{
        const random = Math.random().toString(36).substring(2);
        const date = Date.now().toString(36);

        return random+date;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //validacion de form
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setError(true);
            return;
        }
        setError(false);

        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
        }

        if(paciente.id){
            //Editando
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

            setPacientes(pacientesActualizados);
            setPaciente({});

        } else {
            //Nuevo paciente
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }


        //Reiniciando el form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

        
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {' '}
                <span className="text-indigo-600 font-bold">Adminstralos</span>
            </p>

            <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit}>
                {error && <Error mensaje="Todos los campos son obligatorios"/>}
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="nombre">Nombre Mascota</label>

                    <input 
                        type="text" 
                        name="" 
                        id="nombre"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>

                    <input 
                        type="text" 
                        name="" 
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="correo">Correo Propietario</label>

                    <input 
                        type="email" 
                        name="" 
                        id="correo"
                        placeholder="Correo del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta</label>

                    <input 
                        type="date" 
                        name="" 
                        id="alta"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Síntomas</label>

                    <textarea 
                        name="" 
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los Síntomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>

                <input type="submit" value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                />
            </form>
        </div>
    )
}

export default Formulario
