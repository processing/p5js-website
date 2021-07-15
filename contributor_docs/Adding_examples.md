# Adding examples

Examples help demonstrate different programming concepts and functionality of the library. They can be found on the [p5.js examples page](http://p5js.org/examples/), and run on the page, allowing people to edit and play with them. We are in the process of porting [examples](https://processing.org/examples/) from the Processing site, as well as creating new ones, and would love your help. Below are the steps below to add examples to p5js.org.

## Getting started

0. If you are not yet familiar with GitHub we recommend checking out this [tutorial](https://guides.github.com/activities/hello-world/).
1. Install [node.js](https://nodejs.org/en/), which also automatically installs the npm package manager.
2. [Fork](https://help.github.com/articles/fork-a-repo/) the [p5.js-website](https://github.com/processing/p5.js-website) repository into your own GitHub account.
3. [Clone](https://help.github.com/articles/cloning-a-repository/) your new fork of the repository from GitHub onto your local computer.
4. Using the command line, navigate to the `src/data/examples/build_examples` folder, and install all its necessary dependencies with npm.

   ```bash
   cd src/data/examples/build_examples
   npm install
   ```

## Make an issue

1. Open a new issue on the [p5.js-website repository](https://github.com/processing/p5.js-website/issues) listing the examples you are creating with your name, so efforts aren't duplicated.

## Create your example

1. First, build and test the example code using your HTML file, linking to the most recent version of p5.js. You can find examples to port here.

   - Please use two spaces tabs and see this code style guide.
   - Examples should typically be 710px wide, and a recommended height is 400px. You can modify these dimensions (especially the height) as appropriate.

2. At the top of the JS file you create, add a heading using the template below.

   - The @name field determines the title of the example and the text of its corresponding link on the examples page.
   - The @frame field determines the dimensions of the example frame on the page. If you leave this field out, your running example will default to the size you set with createCanvas(). If you'd like to specify an alternate size (maybe because you have elements outside the canvas, for example), include the @frame line with dimensions separated by a comma.

   ```jsdoc
   /*
    * @name Your Example Name Here (This shows up on the examples page as well.)
    * @frame 710,400 (optional)
    * @arialabel If there is a frame, add more context to its relation to the description and code for users interacting with your example with a screen reader. 
    * @description Write a description of your example here. This gets displayed
    * on the page underneath your example. You can use <br><br> to add a line
    * break. Please limit lines to 80 columns (total characters) long.
    */
   ```

## Add your example to p5js.org

1. Place the JS file with your code and heading (do not include the HTML or p5.js files) in `src/data/examples/en/` of your local repository.

   - The subfolder the file is placed in determines the topic heading the examples displays under on [p5js.org/examples](https://p5js.org/examples/). Add your file into the appropriate folder, or create a new one if necessary.
   - If you create a new folder, you will also need to add the folder name to the `examples` section in the `src/data/en.yml`, `src/data/es.yml`, and `src/data/zh-Hans.yml` files for the headings to show up properly.
   - The filename should follow the format: `XX_name_of_your_example.js`. The XX\_ prefix (starting with 00) indicates the order that the files will show up on the page.

2. Place duplicate copies of the file in the corresponding folders in `src/data/examples/es/`, and `src/data/examples/zh-Hans/`. This allows us to build the Spanish and Chinese versions of the example. If you know either of these languages, feel free to translate the heading text and comments.

3. If you have any extra files that need to be included (images, JSON, etc), place them in the `src/data/examples/assets` folder. Try to keep these files small.

4. [Grunt](https://gruntjs.com/) should now be installed, and you can use it to build the website by navigating to the top-level directory and typing:

   ```bash
   npm run watch
   ```

5. A local build of the p5js.org site should open in your web browser and you can navigate to the examples page to see your changes.

6. Once everything is ready, submit your changes as a [pull request](https://help.github.com/articles/creating-a-pull-request/).

## Notes about translating examples

- The [p5js.org/examples](https://p5js.org/examples/) page is built from the data in [src/data/](https://github.com/processing/p5.js-website/tree/master/src/data).
- Within the examples folder, there is a folder for each of the three languages we currently support: `en/`, `es/`, and `zh-Hans/`.
- Translations for the topic headers on the example index page are done in the YML files `src/data/*.yml`.

## To add examples

1. Locate the JS file within `src/data/examples` that corresponds to the example you want to add a translation for.
2. Translate the heading and comments. Do not change variable or function names. Do not change the filename.
3. To update a category heading on [p5js.org/examples](https://p5js.org/examples/), edit the YML files at `src/data/*.yml`.

## When adding a new example

1. First, add an English version of the file to the `en/` folder, then make sure it is duplicated in the same place in all other languages, then translate for whichever languages you can.
2. The folder, file, and numbering structure should match exactly between the different languages. Do not change the filenames. The text for the example name, description, and source code are all in the `.js` files in the folders.
3. If you have created a new folder, add entries to the "Examples" section of each of the YML files `src/data/*.yml` with the folder name as the key.
