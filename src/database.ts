import {connect} from 'mongoose';

export async function startConnection() {
  await connect('mongodb://localhost/photo-gallery-db', {
    useNewUrlParser: true,
    useFindAndModify: false
  });
  console.log('Conexión a la base de datos establecida.');
}