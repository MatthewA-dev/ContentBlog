from enum import Enum
import json

class TokenType(Enum):
    RAW = 0, # meaning do not process (use this for math and code)
    TEXT = 1, # generic
    CODE = 2,
    MATH = 3,
    HEADER = 4,
    COMMAND = 5,
    OPENCURLY = 6,
    CLOSECURLY = 7,
    IMAGE = 8

class ArticleObject():
    def __init__(self, type=TokenType.TEXT, arguments={}):
        self.type=type
        self.arguments=arguments
    def __str__(self):
        return '{' + self.type.name + ", " + str(self.arguments) + "}"
    def __repr__(self):
        return self.__str__()
    def toJSON(self):
        return (self.type.name, self.arguments)

def parse(article):
    # simplify the output, remove block objects
    temp_article = article.split("\n")

    article_objects = []
    i = 0
    while(i < len(temp_article)):
        line = temp_article[i]
        if(len(line) == 0):
            i += 1
            continue
        # header
        elif(line[0] == "#"):
            depth = 0
            while(depth < len(line) and line[depth] == "#"):
                depth += 1
            text = line[depth:].strip()
            if(text != ""):
                article_objects.append(ArticleObject(TokenType.HEADER, {"content": text, "depth" : depth}))
        # math mode
        elif(line == "$$"):
            content=[]
            i += 1
            while(i < len(temp_article) and temp_article[i] != "$$"):
                content.append(temp_article[i])
                i += 1
            content = "\n".join(content)
            article_objects.append(ArticleObject(TokenType.MATH, {"content": content}))
        # code
        # supports language definition
        elif(line[:3] == "```"):
            language = line[3:]
            content=[]
            i += 1
            while(i < len(temp_article) and temp_article[i] != "```"):
                content.append(temp_article[i])
                i += 1
            content = "\n".join(content)
            article_objects.append(ArticleObject(TokenType.CODE, {"content": content, "language": language}))
        else:
            article_objects.append(ArticleObject(TokenType.RAW, {"content" : line}))
        i += 1

    parsed_article_objects = []
    # parse text objects
    for article_object in article_objects:
        if(article_object.type != TokenType.RAW):
            parsed_article_objects.append(article_object)
        else:
            content = []
            i = 0
            text = article_object.arguments["content"]
            parsed_content = ""
            def flush():
                nonlocal parsed_content
                nonlocal content
                if(parsed_content != ""):
                    content.append(ArticleObject(TokenType.TEXT,{"content" : parsed_content}))
                    parsed_content = ""
            # assume beginning at first curly bracket, otherwise won't do anything
            # will end when reached end of input or reached closing curly bracket, setting i to be after it
            def parse_argument():
                nonlocal i
                if(i >= len(text) or text[i] != '{'):
                    return ""
                arg = ""
                i += 1
                while(i < len(text) and text[i] != '}'):
                    arg += text[i]
                    i += 1
                i += 1
                return arg
            while i < len(text):
                if(text[i] == "\\"):
                    i += 1
                    if(i == len(text)):
                        continue
                    # both commands take two arguments
                    # i - image, first argument is image path, second is image subtitle
                    # f - format, first argument is formatting instruction, second is formatted text
                    if(text[i].lower() == 'f' or text[i].lower() == 'i'):
                        command = text[i].lower()
                        # should be on first curly brace, otherwise, leave
                        i += 1
                        arg1 = parse_argument()
                        arg2 = parse_argument()
                        while(i < len(text) and text[i] != '}'):
                            arg2 += text[i]
                            i += 1
                        flush()
                        if(command == 'i'):
                            if(content != []):
                                parsed_article_objects.append(content)
                            parsed_article_objects.append(ArticleObject(TokenType.IMAGE, {"path": arg1, "subtitle": arg2}))
                            content = []
                        elif(command == 'f'):
                            content.append(ArticleObject(TokenType.TEXT, {"content": arg2, "format": arg1}))
                    else:
                        # adding character without parsing it, allowing escapes
                        parsed_content += text[i]
                elif(text[i] == "`"):
                    flush()
                    code = ""
                    i += 1
                    while (i < len(text) and text[i] != "`"):
                        code += text[i]
                        i += 1
                    content.append(ArticleObject(TokenType.CODE, {"content": code, "inline" : True}))
                elif(text[i] == "$"):
                    flush()
                    math = ""
                    i += 1
                    while (i < len(text) and text[i] != "$"):
                        math += text[i]
                        i += 1
                    content.append(ArticleObject(TokenType.MATH, {"content": math, "inline" : True}))
                else:
                    parsed_content += text[i]
                i += 1
            flush()
            if(content != []):
                parsed_article_objects.append(content)
    
    # serialize all classes
    def serialize(article_objects):
        serialized_article_objects = []
        for object in article_objects:
            if(type(object) is list):
                serialized_article_objects.append(serialize(object))
            else:
                serialized_article_objects.append(object.toJSON())
        return serialized_article_objects

    return json.dumps(serialize(parsed_article_objects))