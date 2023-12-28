from pathlib import Path
from shutil import copy, copytree
from bs4 import BeautifulSoup, Tag
import json
import datetime


# import all articles and save

articles = []

# create new articles parsed directory
main = Path("./articles")
parsed = Path("./articles_parsed")
if (not parsed.exists()):
    parsed.mkdir()
if (not parsed.is_dir()):
    parsed.unlink()
    parsed.mkdir()

for file in main.iterdir():
    soup = BeautifulSoup((file / "main.html").read_text(), "html.parser")
    date = soup.find(name="head").find("date").attrs

    # parse individual line breaks as different paragraphs
    body = soup.find(name="body")
    body_new = ""
    for child in body.contents:
        if isinstance(child, str):
            child = child.split("\n\n")
            for line in child:
                if (line.strip() == ""):
                    continue
                body_new += f"<p>{line.strip()}</p>"
        elif isinstance(child, Tag):
            body_new += str(child)

    # generate object
    articles.append({"title": soup.find(name="head").find("title").text,
                     # swap their parent directories
                     "cover": str((file.parents[1] / "articles_parsed" / file.name / soup.find(name="head").find("cover").attrs["src"])),
                     "main": str(file.parents[1] / "articles_parsed" / file.name / "main.html"),
                     "date": datetime.date(int(date["year"]),
                                           int(date["month"]),
                                           int(date["day"])),
                    "author": soup.find(name="head").find("author").text})
    # copy into parsed
    copytree(file, parsed / file.name, dirs_exist_ok=True)
    with open(parsed / file.name / "main.html", "w") as f:
        f.write(body_new)

# export into json


def key(element):
    return element["date"]


articles.sort(key=key, reverse=True)

# convert datetime into string representation
for i, article in enumerate(articles):
    temp = articles[i]
    temp["date"] = str(temp["date"])
    articles[i] = temp

jsonString = json.dumps(articles)

with open("articles.json", "w") as file:
    file.write(jsonString)
