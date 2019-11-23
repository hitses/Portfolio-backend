import {Request, Response} from 'express';
import path from 'path';
import fs from 'fs-extra';

import Photo from '../models/Photo';

export async function getPhotos(req: Request, res: Response): Promise<Response>{
  const photos = await Photo.find();
  return res.json(photos)
}

export async function getPhotoById(req: Request, res: Response): Promise<Response> {
  const photo = await Photo.findById(req.params.id);
  return res.json(photo);
}

export async function createPhoto(req: Request, res: Response) {

  const {title, description} = req.body;
  const newPhoto = {
    title: title,
    description: description,
    imagePath: req.file.path
  };
  const photo = new Photo(newPhoto);
  await photo.save();
  return res.json({
    message: 'Imagen guardad correctamente',
    photo
  })
}

export async function deletePhotoById(req: Request, res: Response): Promise<Response> {
  const photo = await Photo.findByIdAndRemove(req.params.id);
  if(photo) {
    await fs.unlink(path.resolve(photo.imagePath))
  }
  return res.json({
    msg: 'Imagen eliminada correctamente',
    photo
  })
}

export async function updatePhotoById(req: Request, res: Response): Promise<Response> {
  const {id} = req.params;
  const {title, description} = req.body;
  const updatedPhoto = await Photo.findByIdAndUpdate(id, {
    title,
    description
  }, {
    new: true
  });
  return res.json({
    msg: 'Imagen actualizada correctamente',
    updatedPhoto
  })
}