const CellphoneController = require('../controllers/CellphoneController');
const UserController = require('../controllers/UserController');
const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');
const storage = require("../config/files");

const upload = multer({ storage: storage,
	fileFilter: function (req, file, cb) {
	        const ext = path.extname(file.originalname);
	        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
	            return cb(new Error('Erro extensão não suportada!'), false);
	        }
	        cb(null, true);
	    },
	    limits:{
	        fileSize: 2048 * 2048
	    }

 });

const allUploads = upload.fields([{ name: 'photo', maxCount: 4 }]);
router.post('/cellphones/files/:id', allUploads, CellphoneController.addFilesCellphone);

router.post('/cellphones/photo/:id', upload.single('photo'), CellphoneController.addPhotoCellphone);
router.delete('/photo/:id', CellphoneController.removePhoto);

router.get('/cellphones', CellphoneController.index);
router.get('/cellphones/:id', CellphoneController.show);
router.post('/cellphones', CellphoneController.create);
router.put('/cellphones', CellphoneController.update);
router.delete('/cellphones/:id', CellphoneController.destroy);

router.post('/user', UserController.create);

module.exports = router;
