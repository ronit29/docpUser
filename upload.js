// set env vars
require('dotenv').config()

const AWS = require("aws-sdk"); // from AWS SDK
const fs = require("fs"); // from node.js
const path = require("path"); // from node.js
const mime = require('mime');

// configuration
const config = {
    s3BucketName: process.env.AWS_BUCKET_NAME
};

// initialize S3 client
const s3 = new AWS.S3({
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

uploadFolder(path.join(__dirname, './dist'), 'dist')
uploadFolder(path.join(__dirname, './assets'), 'assets')

function uploadFolder(folderPath, folderName) {
    // get of list of files from 'dist' directory
    fs.readdir(folderPath, (err, files) => {

        if (!files || files.length === 0) {
            console.log(`provided folder '${folderPath}' is empty or does not exist.`);
            console.log('Make sure your project was compiled!');
            return;
        }

        // for each file in the directory
        for (const fileName of files) {

            // get the full path of the file
            const filePath = path.join(folderPath, fileName);

            // if directory then recursively upload those as well
            if (fs.lstatSync(filePath).isDirectory()) {
                let new_folder_name = folderName + "/" + fileName
                uploadFolder(filePath, new_folder_name)
                continue
            }

            // read file contents
            fs.readFile(filePath, (error, fileContent) => {
                // if unable to read file contents, throw exception
                if (error) { throw error; }
                let content_type = mime.getType(fileName)
                // upload file to S3
                s3.putObject({
                    Bucket: config.s3BucketName,
                    Key: `cp/${folderName}/${fileName}`,
                    Body: fileContent,
                    ContentType: content_type,
                    CacheControl: 'max-age=31557600'
                }, (res) => {
                    console.log(`Successfully uploaded '${fileName}' - ${content_type}`);
                });

            });
        }
    });
}
