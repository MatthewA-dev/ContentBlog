from pathlib import Path
from shutil import copytree
import json
from enum import Enum
from articleParser import parse

articles = []

# create new articles parsed directory
main = Path("./articles")
parsed = Path("./articles_parsed")
if (not parsed.exists()):
    parsed.mkdir()
if (not parsed.is_dir()):
    parsed.unlink()
    parsed.mkdir()

for article_dir in main.iterdir():
    # default values for metadata
    metadata = {
        "title" : "No title",
        "author" : "No author",
        "year" : "1",
        "month" : "1",
        "day" : "1",
        "cover" : "",
        "article" : None,
        "directory" : article_dir.name
    }
    # open and parse the metadata file
    metadata_raw = (article_dir / "article.meta").read_text()
    metadata_raw = metadata_raw.split("\n")
    for item in metadata_raw:
        if(item == ""):
            continue
        item = item.split("=",1)
        if(len(item) < 2):
            continue
        parameter = item[0].strip()
        value = item[1].strip()
        metadata[parameter] = value
    
    # ignore empty main articles
    if(metadata["article"] is None):
        continue
    
    article_contents = ""
    with open(article_dir / metadata["article"],"r") as f:
        article_contents = f.read()
    article_contents = parse(article_contents)

    # parse date
    try:
        metadata["year"] = int(metadata["year"])
        metadata["month"] = int(metadata["month"])
        metadata["day"] = int(metadata["day"])
    except ValueError: # reset the date if any are incorrect
        metadata["year"] = 1
        metadata["month"] = 1
        metadata["day"] = 1
    
    articles.append(metadata)

    copytree(article_dir,parsed / article_dir.name, dirs_exist_ok=True)
    with open(parsed / article_dir.name / metadata["article"], 'w') as f:
        f.write(article_contents)
    with open(parsed / article_dir.name / "article.meta", "w") as f:
        f.write(json.dumps(metadata))

def key(element):
    return str(element["year"]) + "-" + str(element["month"]) + "-" + str(element["day"])
articles.sort(key=key, reverse=True)

with open("articles.json", 'w') as f:
    f.write(json.dumps(articles))