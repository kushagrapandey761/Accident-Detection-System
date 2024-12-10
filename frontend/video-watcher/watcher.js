const fs = require('fs');
const { Pool } = require('pg');
require('dotenv').config();

// Database connection
const pool = new Pool({
 host: process.env.DB_HOST,
 port: process.env.DB_PORT,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
});


const videoExists = async (videoName) => {
 try {
    const query = 'SELECT 1 FROM videos WHERE video_link = $1';
    const result = await pool.query(query, [videoName]);
    return result.rowCount > 0;
 } catch (error) {
    console.error('Error checking video existence:', error);
    return false;
 }
};


const insertVideoName = async (videoName) => {
 try {
    const query = 'INSERT INTO videos (video_link,location_link) VALUES ($1,$2)';
    await pool.query(query, [videoName,"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13762.699374755417!2d77.96244295!3d30.416965949999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d52538c64a1f%3A0x90df94494049a87e!2sAgrasen%20Mansion%20Boys%20Hostel%20Near%20UPES%2C%20Bidholi!5e0!3m2!1sen!2sin!4v1713605628231!5m2!1sen!2sin"]);
    console.log(`Video name ${videoName} added to the database.`);
 } catch (error) {
    console.error('Error inserting video name:', error);
 }
};


const watchPublicFolder = () => {
 const publicFolderPath = '../public';

 fs.readdir(publicFolderPath, async (err, files) => {
    if (err) {
        console.error('Error reading public folder:', err);
        return;
    }

    files.forEach(async (filename) => {
        if (filename.endsWith('.mp4')) {
            console.log(`New .mp4 file detected: ${filename}`);
            const exists = await videoExists(filename);
            if (!exists) {
                insertVideoName(filename);
            } else {
                console.log(`Video ${filename} already exists in the database.`);
            }
        }
    });
 });

 fs.watchFile(publicFolderPath, (curr, prev) => {
    if (curr.mtimeMs !== prev.mtimeMs) {
        console.log('Public folder modified.');
        // Re-read the public folder to handle changes
        fs.readdir(publicFolderPath, async (err, files) => {
            if (err) {
                console.error('Error reading public folder:', err);
                return;
            }

            files.forEach(async (filename) => {
                if (filename.endsWith('.mp4')) {
                    console.log(`New .mp4 file detected: ${filename}`);
                    const exists = await videoExists(filename);
                    if (!exists) {
                        insertVideoName(filename);
                    } else {
                        console.log(`Video ${filename} already exists in the database.`);
                    }
                }
            });
        });
    }
 });
};

// Start watching the public folder
watchPublicFolder();