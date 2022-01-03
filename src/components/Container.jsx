import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { URL_BASE } from '../config';
import { GETALL, GETBYID } from '../types';

export const Container = () => {
  const [id, setId] = useState('');

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const getAll = async () => {
    let res = await axios.get(`${URL_BASE}citasReactivas`),
      json = await res.data;
    console.log('all', json);
    dispatch({ type: GETALL, payload: json });
  };

  const getById = async () => {
    let res = await axios.get(`${URL_BASE}citasReactivas/${id}/byidPaciente`),
      json = await res.data;

    console.log('byid', json);

    dispatch({ type: GETBYID, payload: json });
  };

  console.log('estado', state?.cita);

  return (
    <div>
      <div className="row">
        <div className="col"></div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="input-group mb-3 mt-3">
            <input onChange={handleChange} type="text" className="form-control" placeholder="Id" />
            <button className="btn btn-success" onClick={() => getById()}>
              GetById
            </button>
            <button className="btn btn-success mx-3" onClick={() => getAll()}>
              GetAll
            </button>
          </div>
        </div>
        <div className="col"></div>
      </div>
      <table className="table table-hover table-bordered mt-5 text-center container">
        <thead>
          <tr>
            <th scope="col">Id Paciente</th>
            <th scope="col">Nombre Paciente</th>
            <th scope="col">Apellidos Paciente</th>
            <th scope="col">Nombre Medico</th>
            <th scope="col">Apellidos Medico</th>
            <th scope="col">FechaReservaCita</th>
            <th scope="col">HoraReservaCita</th>
            <th scope="col">EstadoReservaCita</th>
            <th scope="col">Padecimientos</th>
            <th scope="col">Tratamientos</th>
          </tr>
        </thead>
        <tbody>
          {state?.cita?.citas?.map((cita) => (
            <tr key={cita.id}>
              <td> {cita.idPaciente} </td>
              <td> {cita.nombrePaciente} </td>
              <td> {cita.apellidosPaciente} </td>
              <td> {cita.nombreMedico} </td>
              <td> {cita.apellidosMedico} </td>
              <td> {cita.fechaReservaCita} </td>
              <td> {cita.horaReservaCita} </td>
              <td> {cita.estadoReservaCita} </td>
              {cita.tratamientosList.map((info) => (
                <>
                  <td> {info.padecimiento} </td>
                  <td> {info.tratamiento} </td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
