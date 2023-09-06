const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Kullanmak istediğiniz port numarasını ayarlayın

// Fotoğrafların bulunduğu klasörü belirleyin
const photosDirectory = './photos';

app.get('/random-photo', (req, res) => {
  // Fotoğrafları listele
  const fs = require('fs');
  fs.readdir(photosDirectory, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Rastgele bir fotoğraf seçin
    const randomIndex = Math.floor(Math.random() * files.length);
    const randomPhoto = files[randomIndex];

    // Seçilen fotoğrafın yolunu oluşturun
    const photoPath = `${photosDirectory}/${randomPhoto}`;

    // Seçilen fotoğrafı istemciye gönderin
    res.sendFile(photoPath, { root: __dirname });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});