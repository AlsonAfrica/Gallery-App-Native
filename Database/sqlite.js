import * as SQLite from 'expo-sqlite';

// Database initialization
export async function initializeDatabase() {
  try {
    // Open the database
    const db = await SQLite.openDatabaseAsync('PhotoGeotagDB');

    // Create images table with columns for image URI, date, time, latitude, and longitude
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uri TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Insert a new image record
export async function insertImage(db, imageData) {
  try {
    const result = await db.runAsync(
      'INSERT INTO images (uri, date, time, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
      imageData.uri,
      imageData.date,
      imageData.time,
      imageData.latitude,
      imageData.longitude
    );

    console.log('Image inserted with ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting image:', error);
    throw error;
  }
}

// Get all stored images
export async function getAllImages(db) {
  try {
    const images = await db.getAllAsync(
      'SELECT * FROM images ORDER BY created_at DESC'
    );
    return images;
  } catch (error) {
    console.error('Error getting all images:', error);
    throw error;
  }
}

// Delete an image by ID
export async function deleteImage(db, id) {
  try {
    const result = await db.runAsync('DELETE FROM images WHERE id = ?', id);
    return result.changes > 0;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

// Get images by date range
export async function getImagesByDateRange(db, startDate, endDate) {
  try {
    const images = await db.getAllAsync(
      'SELECT * FROM images WHERE date BETWEEN ? AND ? ORDER BY created_at DESC',
      startDate,
      endDate
    );
    return images;
  } catch (error) {
    console.error('Error getting images by date range:', error);
    throw error;
  }
}