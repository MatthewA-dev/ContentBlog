from pathlib import Path
from bs4 import BeautifulSoup
import json
import datetime


# import all articles and save

articles = []

main = Path("./articles")

for file in main.iterdir():
    soup = BeautifulSoup((file / "main.html").read_text(), "html.parser")

    date = soup.find(name="head").find("date").attrs

    articles.append({"title": soup.find(name="head").find("title").text,
                     "cover": str((file / soup.find(name="head").find("cover").attrs["src"])),
                     "main": str(file / "main.html"),
                     "date": datetime.date(int(date["year"]),
                                   int(date["month"]),
                                   int(date["day"]))})

# export into json
def key(element):
    return element["date"]

articles.sort(key=key,reverse=True)

# convert datetime into string representation
for i, article in enumerate(articles):
    temp = articles[i] 
    temp["date"] = str(temp["date"])
    articles[i] = temp

jsonString = json.dumps(articles)

with open("articles.json","w") as file:
    file.write(jsonString)