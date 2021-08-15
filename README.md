# video-streamer

`video-streamer` is a web-based application written in Angular 11 (frontend) and NodeJS (middleware).

The functionalities are as follow:
1. Display uploaded videos with the following details:
   1. A thumbnail (256x256)
   2. Title
   3. Description
   4. Category
2. Stream the selected video
3. Upload new video

## Limitations
`video-stream` only allows .mp4 and .mov file format and up to 200MB.

## Prerequisite
Install NodeJS, Angular, and PostgreSQL. For more info on how to install them, please visit the following sites:
1. Angular - https://angular.io/guide/setup-local
2. NodeJS - https://nodejs.org/en/download/package-manager/
3. PostgreSQL - https://www.postgresql.org/download/

### Database and Tables
1. Once the ProstgeSQL has been set up, create the database and the tables.
2. You may find the SQL files in `./database/`.

## Building and Running the Application

### Angular Web Application
1. To run the Angular web application, execute `npm run start`.
2. Open a browser and go to `http://localhost:4200`.

### NodeJS Application
1. To run the NodeJS application, execute `npm run dev`.
2. The application will expose port `8000`.

## Using the Application
Initially, no videos shall be displayed, since you have not uploaded anything yet.

To upload a new video, click the "Upload New Video" button at the top right corner of the page.

You'll then be asked to provide the following:
1. Title
2. Description
3. Category
4. The video file

If you provide a file other than .mp4 or .mov or if the size exceeds 200MB, you'll be notified that it won't be uploaded. Otherwise, you shall be able to see a preview of the video that you're about to upload.

Once done, click the "Upload" button and you'll be redirected to the streaming page displaying the video that you just uploaded.

You can go back to the main page by clicking the logo on the top left corner of the page.

Once you get there, you'll be able to see a thumbnail of the video that you uploaded and its related details.

## Endpoints

The following are the endpoints defined in this application:

`GET /videos` - to get the list of uploaded videos

`GET /video/:id` - to get the video file based on the provided id

`GET /video/:id/play` - to stream the selected video

`POST /upload` - to upload the video file alongside the details that you provided (only accepts *.mp4 and *.mov, and up to 200MB)

`GET /categories` - to get the available categories

`POST /categories` - to add new categories (only accepts string array e.g. ['Education', 'Health'])
