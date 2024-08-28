# Content Blog
This is a blog designed to be hosted on GitHub pages. It allows for articles to be written in a text file, which is parsed into JSON to be displayed on the blog after publishing it to Github pages.

# Features
- Access full list of all articles, sorted from latest to oldest
- Able to put author, date, cover image, and title as header information
- Articles can be linked using URLs
- Text is automatically formatted into paragraphs
- Images
- Block and inline code, highlighted using PrismJS
- Block and inline math, displayed using MathJax

# Usage
## Reading
All articles will be stored on GibHub pages at the [following link](https://matthewa-dev.github.io/ContentBlog/)

Clicking on a card will nagivate you to the coresponding article, and the back button will nagivate you back. 

Links to articles will automatically link you to the coresponding article. For example, if you [click here](https://matthewa-dev.github.io/ContentBlog/?article=articlejson), you will see an example article.

## Writing
Writing articles begins with the `articles` folder. Creating a new directory here will correspond to a new article.

To begin, write a header file titled `article.meta` in order to specify its metadata. Here is an example `article.meta`

```
title = Example Article
author = Example Author
year = 2024
month = 8
day = 27
cover = cover.png
article = main
```

`cover.png` refers to a file called `cover.png` which is in the article directory, and `main` refers to a file called `main` in the article directory. You can omit the spaces between the equals sign, or you can write an empty line (`title = `) in order to set something as empty. Any articles with a missing article main file will not be displayed.


### Headers
Create a line beginning with one or more hashes in order to create a header:
```
# This is an h1
## This is an h2
### This is an h3
#### This is an h4
##### This is an h5
###### This is an h6
```
### Code
Code is parsed using backticks. Inline code uses single back ticks, while block code begins a line with three backticks followed by the language. Refer to the [PrismJS docs](https://prismjs.com/#supported-languages) for the language name.
````
`print("Hello world!")`

```language-python
def fib(n):
    if (n <= 0):
        return 0
    elif(n == 1):
        return 1
    else:
        return fib(n - 1) + fib(n - 2)
```
````
### Math
Similarly to code, use single dollar signs for inline math and begin a line with double dollar signs for block math.
```
$x = \frac{-b \pm \sqrt{b^2 - 4ac}} {2a}$

$$
\int^a_b x^2dx = \left[\frac{x^3}{3}\right]^b_a = \frac{b^3}{3} - \frac {a^3}{3}
$$
```
### Images
Use `\i{}{}` to include images. The content of the first curly bracket refers to the image location, while the second refers to the subtitle of the image.
```
\i{example.png}{An example image}
```

### Text
Any text which is not parsed by the above rules is treated as normal text. Characters can be escaped using a backslash (`\`)
```
Lorem ipsum dolor sit amet, consectetur...
\# <- If we want a hash at the beginning of the line
```

Once finished, run `articleOrganize.py`, which will format your article into `articles_parsed` and add it to `articles.json`. You can then publish it to Github Pages.
