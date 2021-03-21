@author: rgbz
@title: How This Magazine Was Made

# How This Magazine Was Made

Since I like to make extra, unnecessary work for myself, I figured why not create a magazine and a tool to make the magazine at once?

So to make the magazine, I made [ziner](https://github.com/RGBz/ziner), an open source CLI tool for making your own web-based 'zines.

## How does it work?
I've become a fan of [Markdown](https://en.wikipedia.org/wiki/Markdown) and figured I could make a tool to convert Markdown articles into something that looks like a magazine.

The basic idea was:
- Each issue lives inside a directory
- Within the directory include Markdown articles
- The articles can reference images
- The articles can include metadata to style them
- The `ziner` CLI tool would convert the directory into HTML files that can be uploaded to a website

Every magazine needs a table of contents which a YAML file would provide.

`ziner` is a Node application. To have it create the HTML files, run:
```bash
node src/index.js PATH_TO_DIRECTORY/table_of_contents.yml
```

## The future of ziner
Since I made this tool in one sitting while I made the first magazine to use it, it can obviously stand to be improved.

Chances are this will never be all that great of a tool, but it's a fun project.