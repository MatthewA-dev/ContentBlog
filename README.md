# MatthewA-blog
This is a blog that I made in React designed to be hosted on GitHub pages. It allows for articles to be written in HTML in Latex style, which involves using commands to achieve text effects. 

# Features
- Access full list of all articles, sorted from latest to oldest
- Able to put author, date, cover image, and title as header information
- Able to link to specific articles using URLs
- Text is automatically formatted into paragraphs
- Able to insert images
- Able to insert block and inline code using PrismJS

# Usage
## Reading
All articles will be stored on GibHub pages at the [following link](https://matthewa-dev.github.io/MatthewA-blog/)

Clicking on a card will nagivate you to the coresponding article, and the back button will nagivate you back. 

Links to articles will automatically link you to the coresponding article. For example, if you [click here](https://matthewa-dev.github.io/MatthewA-blog/?main=articles_parsed%5Carticle2%5Cmain.html), you will see an example article.

## Writing
Writing articles begins with the `articles` folder in the `public` directory. Creating a new directory here will correspond to a new article. The `main.html` file will be the main article.

Header information is stored in a `<head>` tag at the beginnning. Here is an example `<head>` tag
```
<head>
    <title>Example Article</title>
    <cover src="./cover.png" />
    <date day=1 month=1 year=2024 />
    <author>Matthew Aleshechkin</author>
</head>
```
Note that `./cover.png` refers to a file stored locally within the article folder.

Following that, comes the `<body>` tag which stores the main article. You may write any text here, and it will be formatted automatically. Double line breaks will create new paragraphs, as well as manually inserting `\n`.

Here is an example image within an article:
```
<img img-src="test.png"></img>
```
And here is an example code block. Note that adding the `block` attribute to the code block will make it block code, and removing it will make it inline code.
```
<code block class="python">import foo from bar
print("testing")
for x in range(123):
    print(x)</code>
```
The class name specifies the language according to the [PrismJS](https://prismjs.com/#supported-languages) docs. You do not need to add `language-` before the language.

Once finished, run `articleOrganize.py`, which will format your article into `articles_parsed` and add it to `articles.json`.

This then allows it to be accessed by the app.

# Known issues
- PrismJS does not highlight code correctly
- Article linking is not done using subdirectories, and is instead using URI parameters
- Header information is not done up to HTML5 spec, as it uses invalid tag names

# Planned features
- Support for Latex Math using MathJax
- Better nagivation of the webpage using the back and forward buttons
- Addition of Homepage
- Ability to view a certain amount of cards at once, with buttons to nagivate between pages of articles to minimize scrolling.
