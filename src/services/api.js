import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

axios.get('/someendpoint')
  .then(response => {
    // Manejo de la respuesta exitosa
  })
  .catch(error => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error de respuesta:', error.response.data);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      // Error al configurar la solicitud o al procesarla
      console.error('Error al procesar la solicitud:', error.message);
    }
    console.error('Configuración de la solicitud:', error.config);
  });

  
export default api;
