const Cellphone = require('../models/Cellphone');
const Photo = require('../models/Photo');
require('../config/dotenv')();
const fsPromise = require('fs').promises;
const path = require('path');

const index = async (req, res) => {
	try {
		const cellphones = await Cellphone.findAll();
		return res.status(200).json({cellphones});
	} catch (err) {
		return res.status(500).json({err});
	}
}
const show = async(req, res) => {
	try {
		const {id} = req.params
		const cellphone = await Cellphone.findByPk(id);
		return res.status(200).json({cellphone});
	} catch (err) {
		return res.status(500).json({err});
	}
}
const create = async(req, res) => {
	try {
		const cellphone = await Cellphone.create(req.body);
		return res.status(201).json({cellphone});
	} catch (err) {
		return res.status(500).json({err});
	}
}
const update = async(req, res) => {
	try {
		const {id} = req.params;
		const cellphone = await Cellphone.update(req.body, {where: {id: id}});
		return res.status(200).json({cellphone});
	} catch (err) {
		return res.status(500).json({err});
	}
}

const destroy = async(req,res) => {
	try {
		const {id} = req.params;
		await Cellphone.destroy({where: {id: id}});
		return res.status(200).json("Telefone deletado com sucesso.");
	} catch (err) {
		return res.status(500).json({err});
	}
}

const addPhotoCellphone = async(req, res) => {
	try {
		const {id} = req.params;
		const cellphone = await Cellphone.findByPk(id, {include:{model: Photo}});
		if(req.file){
			const path = process.env.APP_URL + "/uploads/" + req.file.filename;
			console.log("path");

			const photo = await Photo.create({
				path: path,
			});
			await cellphone.addPhoto(photo);
		}
		await cellphone.reload();
		return res.status(200).json(cellphone);
	} catch (e) {
		return res.status(500).json(e + "!");
	}
}
const removePhoto = async(req, res) => {
	try {
		const {id} = req.params;
		const photo  = await Photo.findByPk(id);
		const pathDb = photo.path.split("/").slice(-1)[0];
		await fsPromise.unlink(path.join(__dirname, "..", "..", "uploads", pathDb));
		await photo.destroy();
		return res.status(200).json("Foto deletada com sucesso");
	} catch (e) {
		return res.status(500).json(e + "!");
	}
}
const addFilesCellphone = async(req, res) => {
	try {
		const {id} = req.params;
		const cellphone = await Cellphone.findByPk(id, {include:{model: Photo}});
		if(req.files){
			req.files.photo.forEach(async (photoFromReq) => {
				const path = process.env.APP_URL + "/uploads/" + photoFromReq.filename;
				const photo = await Photo.create({
					path: path,
				});
				await cellphone.addPhoto(photo);
			});
		}
		const cellphoneUpdated = await Cellphone.findByPk(id, {include:{model: Photo}});
		return res.status(200).json(cellphoneUpdated);
	} catch (e) {
		return res.status(500).json({e});
	}
}

module.exports = {
	index,
	show,
	create,
	update,
	destroy,
	addPhotoCellphone,
	addFilesCellphone,
	removePhoto
}
