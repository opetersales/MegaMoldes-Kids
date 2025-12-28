
from bs4 import BeautifulSoup
import os

file_path = r'c:\Users\Peterson\Downloads\saveweb2zip-com-megamoldeskidsss-netlify-app\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

soup = BeautifulSoup(content, 'html.parser')
formatted_html = soup.prettify()

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(formatted_html)

print("Formatted index.html")
