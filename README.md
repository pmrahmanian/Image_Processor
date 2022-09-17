# Image_Processor

This service is designed to serve web-ready images. It provides two main functionalities:
- Creating new placeholder images with text overlays.
- Performing transformations on existing images (resizing, format conversions, etc).

This project was developed as part of my Udacity Full Stack with Javascript Nanodegree program.


## Getting Started
---

### Install Technologies and Dependencies
This service is built the following main technologies:
* Typescript
* Node.js / Express.js
* Jasmine / Supertest

For a full list of dependencies, see the  `package.json` file.

Once you have cloned the repo, install dependencies by running `npm install` in your terminal.

### Starting the Server
To run the development server with nodemon run `npm run start`. Nodemon will restart the server upon new changes during development.

To run the built server, first compile the code with `npm run build`,
then start the server with `node dist .` .

### Further Available Developer Scripts
#### Compiling
You can build the production server by running `npm run build` to compile the typescript.

#### Testing
An extensive test suite is provided for each endpoint and method, powered by Jasmine and Supertest. You can run the test suite with the `npm run test` script. This script first builds the project then runs the test suite so that tests are performed on compiled code.

#### Maintenance
This project has ESLint and Prettier installed for code maintenance. You can run these with `npm run prettier` then lint with `npm run lint`.


## Usage
---
The development server will listen on port 3000, base URI:
`http://localhost:3000/`

### Available Endpoints:
#### `GET http://localhost:3000/` 
This endpoint serves this readme file.


#### `GET http://localhost:3000/images` 
This endpoint checks the server for available images to resize with the resize endpoint and displays an unordered list of filenames.


#### `GET http://localhost:3000/images/placeholder`
This endpoint creates and serves a placeholder image in png format. It will also save the created image under the `./assets/placeholders/` directory.

All inputs have default values so there are no required query parameters with this endpoint. However, you can specify any specific values with the following query arguments:
* **width** - [ integer ] - numerical value in pixels, default is 300
* **height** - [ integer ] - numerical value in pixels, default is 300
* **text** - string value for text overlay, default is 'Image Coming Soon...'
* **name** - string value for output file name, default is 'placeholder'
* **r** - [ float from 0 to 255 ] - numerical value for red value in RGBa format, default is 0
* **g** - [ float from 0 to 255 ] - numerical value for green value in RGBa format, default is 0
* **b** - [ float from 0 to 255 ] - numerical value for blue value in RGBa format, default is 0
* **alpha** - [ float from 0 to 1 ] - numerical value for alpha value in RGBa format, default is 1.

The **r** , **g**, and **b** parameters are independently optional. If you only provide one of them, the other values will use the default 0 value. However, if you do not provide any of these arguments, the server will generate a random RGBa color for you. The **alpha** value defaults to 1, however any alpha argument provided will be applied to the randomly generated RGBa color. 

NOTE: The server will calculate wether the background color is light or dark and apply an appropriate text color automatically.

**Example 1**
[`http://localhost:3000/images/placeholder`](http://localhost:3000/images/placeholder)
Will serve a 300 x 300 pixel image with a random solid color bacground with high contrast text overlay of "Image Coming Soon..." and save it as 'placeholder.png' under /assets/placeholders/  

**Example 2**
[`http://localhost:3000/images/placeholder?width=600&r=255&alpha=0.5`](http://localhost:3000/images/placeholder?width=600&r=255&alpha=0.5)
Will serve a 600 x 300 pixel image with a semi-transparent red bacground with black text overlay of "Image Coming Soon..." and save it as 'placeholder.png' under /assets/placeholders/  

**Example 3**
[`http://localhost:3000/images/placeholder?width=600&height=500&text=example%20overlay%20text&name=outputName&r=255&g=255&alpha=0.1`](http://localhost:3000/images/placeholder?width=600&height=500&text=example%20overlay%20text&name=outputName&r=255&g=255&alpha=0.1)
Will serve a 600 x 500 pixel image with a mostlty-transparent yellow bacground with black text overlay of "example overlay text" and save it as 'outputName.png' under /assets/placeholders/


#### `GET http://localhost:3000/images/resize`
This endpoint resizes and converts image files. It takes an image from /assets/originals/ converts it to the output format, resizes it, saves it under the /assets/thumbs/ directory and serves the new imageFile. Before any of these transformations, the server first checks to see if it already has done the resquested transformation by checking if the file exists in /assets/thumbs/ and if it does, it simply serves that file.

The only required parameter for this endpoint is **name**. All other parameters have default values, however, you can specify any specific values. Parameters:
* **name** - *required* - the image file name to work with. You need to specify the extension or else the server will assume its a jpeg.
* **width** - [ integer ] - numerical value in pixels, default is 300
* **height** - [ integer ] - numerical value in pixels, default is 300
* **format** - [ jpg | jpeg | png | gif ] - the desired output format, the default is jpeg

**Example 1**
[`http://localhost:3000/images/resize?name=goldengate`](http://localhost:3000/images/resize?name=goldengate)
Will serve a 300 x 300 pixel version of assets/originals/goldengate.jpg save it as 'goldengate_300x300.jpg' under /assets/thumbs/ for future use.

**Example 2**
[`http://localhost:3000/images/resize?name=canon_beach.jpg&width=600&format=png`](http://localhost:3000/images/resize?name=canon_beach.jpg&width=600&format=png)
Will convert assets/originals/canon_beach.jpg to png format then resize it to 600 x 300 pixels and save it as 'canon_beach_600x300.png' under /assets/thumbs/ for future use. It will then serve the resulting image.

NOTE: To see a list of available images to transform, go to http://localhost:3000/images



## Roadmap
[ ] Extend supported formats for resize endpoint
[ ] Extend supported parameters for resize endpoint to allow for cropping control etc.
[ ] Extend format specific transformations for resize endpoint
[ ] Allow for image upload functionality
[ ] Allow for remote image / URI functionality
[ ] Allow text overlay for images on resize endpoint
[ ] Build a Front-end interface
[ ] Give a stats report for transformations on images
[ ] Develop bulk transformations capabilities

## ToDos
[ ] figure out how to extend the type definitions for sharp text option

## Author
Pedram Rahmanian
&copy; 2022