from pathlib import Path
from shutil import copy, copytree
from bs4 import BeautifulSoup
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
    body = soup.find(name="body").decode_contents()
    body = body.replace("\r", "").split("\n")
    body_new = ""

    for line in body:
        if (line == ""):
            continue
        print(line)
        body_new += f"<p>{line}</p>\n\n"
    articles.append({"title": soup.find(name="head").find("title").text,
                     "cover": str((file / soup.find(name="head").find("cover").attrs["src"])),
                     "main": str(file / "main.html"),
                     "date": datetime.date(int(date["year"]),
                                           int(date["month"]),
                                           int(date["day"]))})
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
