const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Storage config for multer
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// In-memory DB for demo (replace with DB in prod)
let videos = [];

// Middleware: require login as demo user
function requireDemoAuth(req, res, next) {
  if (
    req.user &&
    req.user.email === 'demo5@studyblocks.com'
  ) return next();
  return res.status(401).json({ success: false, message: 'Unauthorized' });
}

// POST /upload-video
router.post('/upload-video', requireDemoAuth, upload.single('video'), (req, res) => {
  const { title, description, category, language, duration, quality, audio, structure, policy } = req.body;
  if (!title || !description || !category || !language || !duration || !req.file) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }
  // Simulate automated checks
  let status = 'pending';
  let review = {
    quality: quality === 'true',
    audio: audio === 'true',
    structure: structure === 'true',
    policy: policy === 'true',
  };
  // If all checks are true, auto-approve for demo
  if (review.quality && review.audio && review.structure && review.policy) status = 'approved';
  const video = {
    id: videos.length + 1,
    uploader: req.user.email,
    title, description, category, language, duration,
    file: req.file.filename,
    status,
    review,
    uploadedAt: new Date()
  };
  videos.push(video);
  res.json({ success: true, video });
});

// GET /my-uploads
router.get('/my-uploads', requireDemoAuth, (req, res) => {
  const myVideos = videos.filter(v => v.uploader === req.user.email);
  res.json({ success: true, videos: myVideos });
});

// Export router
module.exports = router;
