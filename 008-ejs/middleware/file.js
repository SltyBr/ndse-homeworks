const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/books')
    },
    filename(req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8');
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

module.exports = multer({storage});