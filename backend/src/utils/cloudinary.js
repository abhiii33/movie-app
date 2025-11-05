// // import { v2 as cloudinary } from 'cloudinary';
// // import fs from "fs"
// // import "dotenv/config";


// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// console.log("key",process.env.CLOUDINARY_API_KEY);

// // const uploadOnCloudinary = async (localFilePath) => {
// //     try {
// //         if (!localFilePath) {
// //             console.log("❌ No file path provided");
// //             return null;
// //         }
        
// //         // Check if file exists
// //         if (!fs.existsSync(localFilePath)) {
// //             console.log("❌ File does not exist:", localFilePath);
// //             return null;
// //         }
        
// //         console.log("📤 Uploading file to Cloudinary:", localFilePath);
// //         console.log("☁️  Cloudinary config check:");
// //         console.log("   - Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "✓ Set" : "✗ Missing");
// //         console.log("   - API Key:", process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ Missing");
// //         console.log("   - API Secret:", process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ Missing");
       
// //         const response = await cloudinary.uploader.upload(localFilePath, {
// //             resource_type: "auto"
// //         });
        
// //         console.log("✅ Upload successful:", response.url);
        
// //         // Delete local file after successful upload
// //         fs.unlinkSync(localFilePath);
// //         return response;

// //     } catch (error) {
// //         console.error("❌ Cloudinary upload error:", error.message);
// //         console.error("Full error:", error);
        
// //         // Delete local file even if upload fails
// //         if (fs.existsSync(localFilePath)) {
// //             fs.unlinkSync(localFilePath);
// //         }
// //         return null;
// //     }
// // }

// //
// // const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
// //     try {
// //         if (!localFilePath) return null;
// //         if (!fs.existsSync(localFilePath)) return null;

// //         let response;
// //         if (resourceType === "video") {
// //             response = await cloudinary.uploader.upload_large(localFilePath, {
// //                 resource_type: "video",
// //                 chunk_size: 6000000
// //             });
// //         } else {
// //             response = await cloudinary.uploader.upload(localFilePath, {
// //                 resource_type: resourceType
// //             });
// //         }

// //         fs.unlinkSync(localFilePath);
// //         return response;

// //     }  catch (error) {
// //     console.error("❌ Cloudinary upload error FULL DUMP:");
// //     console.dir(error, { depth: null });  // shows nested error info

// //     if (fs.existsSync(localFilePath)) {
// //         fs.unlinkSync(localFilePath);
// //     }
// //     return null;
// // }

// // };
// //  export {uploadOnCloudinary}
// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs"
// import "dotenv/config";

// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// // Verify config on startup
// console.log("☁️  Cloudinary Configuration:");
// console.log("   - Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "✓ Set" : "✗ MISSING");
// console.log("   - API Key:", process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ MISSING");
// console.log("   - API Secret:", process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ MISSING");

// const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
//     try {
//         // Validate input
//         if (!localFilePath) {
//             console.error("❌ No file path provided");
//             return null;
//         }
        
//         // Check if file exists
//         if (!fs.existsSync(localFilePath)) {
//             console.error("❌ File does not exist:", localFilePath);
//             return null;
//         }

//         // Check file size
//         const stats = fs.statSync(localFilePath);
//         const fileSizeInMB = stats.size / (1024 * 1024);
//         console.log(`📦 File size: ${fileSizeInMB.toFixed(2)} MB`);

//         // Verify Cloudinary credentials
//         if (!process.env.CLOUDINARY_CLOUD_NAME || 
//             !process.env.CLOUDINARY_API_KEY || 
//             !process.env.CLOUDINARY_API_SECRET) {
//             console.error("❌ Missing Cloudinary credentials in .env file");
//             return null;
//         }

//         console.log(`📤 Uploading to Cloudinary (${resourceType})...`);

//         let response;
        
//         // Use upload_large for videos (better for large files)
//         if (resourceType === "video") {
//             response = await cloudinary.uploader.upload_large(localFilePath, {
//                 resource_type: "video",
//                 chunk_size: 6000000, // 6MB chunks
//                 timeout: 120000 // 2 minute timeout
//             });
//         } else {
//             response = await cloudinary.uploader.upload(localFilePath, {
//                 resource_type: resourceType,
//                 timeout: 60000 // 1 minute timeout
//             });
//         }

//         console.log("✅ Upload successful!");
//         console.log("   - URL:", response.url);
//         console.log("   - Duration:", response.duration || "N/A");

//         // Delete local file after successful upload
//         fs.unlinkSync(localFilePath);
//         console.log("🗑️  Local file deleted");
        
//         return response;

//     } catch (error) {
//         console.error("❌ Cloudinary upload error:");
//         console.error("   - Message:", error.message);
//         console.error("   - Error code:", error.error?.code);
//         console.error("   - HTTP code:", error.http_code);
        
//         // Log full error for debugging
//         if (error.error) {
//             console.error("   - Full error:", JSON.stringify(error.error, null, 2));
//         }

//         // Clean up local file even on error
//         if (localFilePath && fs.existsSync(localFilePath)) {
//             try {
//                 fs.unlinkSync(localFilePath);
//                 console.log("🗑️  Local file cleaned up after error");
//             } catch (cleanupError) {
//                 console.error("❌ Failed to delete local file:", cleanupError.message);
//             }
//         }
        
//         return null;
//     }
// };

// export {uploadOnCloudinary}

// import { v2 as cloudinary } from 'cloudinary';  // ✅ UNCOMMENTED
// import fs from "fs";
// import "dotenv/config";

// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// // Verify config on startup
// console.log("☁️  Cloudinary Configuration:");
// console.log("   - Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME || "✗ MISSING");
// console.log("   - API Key:", process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ MISSING");
// console.log("   - API Secret:", process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ MISSING");

// const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
//     try {
//         // Validate input
//         if (!localFilePath) {
//             console.error("❌ No file path provided");
//             return null;
//         }
        
//         // Check if file exists
//         if (!fs.existsSync(localFilePath)) {
//             console.error("❌ File does not exist:", localFilePath);
//             return null;
//         }

//         // Check file size
//         const stats = fs.statSync(localFilePath);
//         const fileSizeInMB = stats.size / (1024 * 1024);
//         console.log(`📦 File size: ${fileSizeInMB.toFixed(2)} MB`);

//         // Verify Cloudinary credentials
//         if (!process.env.CLOUDINARY_CLOUD_NAME || 
//             !process.env.CLOUDINARY_API_KEY || 
//             !process.env.CLOUDINARY_API_SECRET) {
//             console.error("❌ Missing Cloudinary credentials in .env file");
//             console.error("Please check your .env file has:");
//             console.error("CLOUDINARY_CLOUD_NAME=your_cloud_name");
//             console.error("CLOUDINARY_API_KEY=your_api_key");
//             console.error("CLOUDINARY_API_SECRET=your_api_secret");
//             return null;
//         }

//         console.log(`📤 Uploading to Cloudinary (${resourceType})...`);

//         let response;
        
//         // Use upload_large for videos (better for large files)
//         if (resourceType === "video") {
//             console.log("   Using upload_large for video file...");
//             response = await cloudinary.uploader.upload_large(localFilePath, {
//                 resource_type: "video",
//                 chunk_size: 6000000, // 6MB chunks
//                 timeout: 120000 // 2 minute timeout
//             });
//         } else {
//             console.log("   Using standard upload for", resourceType);
//             response = await cloudinary.uploader.upload(localFilePath, {
//                 resource_type: resourceType,
//                 timeout: 60000 // 1 minute timeout
//             });
//         }

//         console.log("✅ Upload successful!");
//         console.log("   - Public ID:", response.public_id);
//         console.log("   - URL:", response.url);
//         console.log("   - Secure URL:", response.secure_url);
//         console.log("   - Duration:", response.duration || "N/A");
//         console.log("   - Format:", response.format);

//         // Delete local file after successful upload
//         fs.unlinkSync(localFilePath);
//         console.log("🗑️  Local file deleted");
        
//         return response;

//     } catch (error) {
//         console.error("❌ Cloudinary upload error:");
//         console.error("   - Message:", error.message);
//         console.error("   - Name:", error.name);
        
//         if (error.error) {
//             console.error("   - Error code:", error.error.code);
//             console.error("   - Full error:", JSON.stringify(error.error, null, 2));
//         }
        
//         if (error.http_code) {
//             console.error("   - HTTP code:", error.http_code);
//         }

//         // Clean up local file even on error
//         if (localFilePath && fs.existsSync(localFilePath)) {
//             try {
//                 fs.unlinkSync(localFilePath);
//                 console.log("🗑️  Local file cleaned up after error");
//             } catch (cleanupError) {
//                 console.error("❌ Failed to delete local file:", cleanupError.message);
//             }
//         }
        
//         return null;
//     }
// };

// export { uploadOnCloudinary };
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import "dotenv/config";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Verify config on startup
console.log("☁️  Cloudinary Configuration:");
console.log("   - Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME || "✗ MISSING");
console.log("   - API Key:", process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ MISSING");
console.log("   - API Secret:", process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ MISSING");

const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
    try {
        // Validate input
        if (!localFilePath) {
            console.error("❌ No file path provided");
            return null;
        }
        
        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            console.error("❌ File does not exist:", localFilePath);
            return null;
        }

        // Check file size
        const stats = fs.statSync(localFilePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        console.log(`📦 File size: ${fileSizeInMB.toFixed(2)} MB`);

        // Verify Cloudinary credentials
        if (!process.env.CLOUDINARY_CLOUD_NAME || 
            !process.env.CLOUDINARY_API_KEY || 
            !process.env.CLOUDINARY_API_SECRET) {
            console.error("❌ Missing Cloudinary credentials in .env file");
            return null;
        }

        console.log(`📤 Uploading to Cloudinary (${resourceType})...`);

        let response;
        
        // For videos, use a Promise wrapper to handle the stream properly
        if (resourceType === "video") {
            console.log("   Using upload_stream for video file...");
            
            response = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "video",
                        chunk_size: 6000000,
                        timeout: 120000
                    },
                    (error, result) => {
                        if (error) {
                            console.error("   Stream error:", error);
                            reject(error);
                        } else {
                            console.log("   Stream completed successfully");
                            resolve(result);
                        }
                    }
                );

                // Pipe the file to the upload stream
                const fileStream = fs.createReadStream(localFilePath);
                
                fileStream.on('error', (error) => {
                    console.error("   File read error:", error);
                    reject(error);
                });

                fileStream.pipe(uploadStream);
            });

        } else {
            console.log("   Using standard upload for", resourceType);
            response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: resourceType,
                timeout: 60000
            });
        }

        console.log("✅ Upload successful!");
        console.log("   - Public ID:", response.public_id);
        console.log("   - URL:", response.url);
        console.log("   - Secure URL:", response.secure_url);
        console.log("   - Duration:", response.duration || "N/A");
        console.log("   - Format:", response.format);

        // Delete local file after successful upload
        fs.unlinkSync(localFilePath);
        console.log("🗑️  Local file deleted");
        
        return response;

    } catch (error) {
        console.error("❌ Cloudinary upload error:");
        console.error("   - Message:", error.message);
        console.error("   - Name:", error.name);
        
        if (error.error) {
            console.error("   - Error code:", error.error.code);
            console.error("   - Full error:", JSON.stringify(error.error, null, 2));
        }
        
        if (error.http_code) {
            console.error("   - HTTP code:", error.http_code);
        }

        // Clean up local file even on error
        if (localFilePath && fs.existsSync(localFilePath)) {
            try {
                fs.unlinkSync(localFilePath);
                console.log("🗑️  Local file cleaned up after error");
            } catch (cleanupError) {
                console.error("❌ Failed to delete local file:", cleanupError.message);
            }
        }
        
        return null;
    }
};

export { uploadOnCloudinary };