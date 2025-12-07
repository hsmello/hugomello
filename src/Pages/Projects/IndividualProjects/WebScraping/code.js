const WsCode =`import requests
from requests.exceptions import ConnectTimeout
from bs4 import BeautifulSoup
import pandas as pd
import pprint

from urllib.parse import urlparse
import tkinter as tk
from tkinter import messagebox

messagebox.showinfo("Loading", "This script may take some time to run. You'll see a confirmaiton message when it finishes.")

def is_valid_url(url):
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])  # Check if both scheme and netloc (domain) are present
    except:
        return False

url = 'https://sseinitiative.org/exchanges-filter-search/'

response = requests.get(url)

soup = BeautifulSoup(response.content, 'html.parser')
results_div = soup.find('div', class_='cstm-db-rslts-list')
divs = results_div.find_all('div', class_='cstm-db-rslts-list-item')
hrefs_SE = [div.find('a')['href'] for div in divs]

excel_writer = pd.ExcelWriter('WS_output.xlsx', engine='xlsxwriter')
country_list = []
all_links = {}
timeout_links = [] 
sll_links = [] 
offline_links = []  # List to store data for offline links

for index, href in enumerate(hrefs_SE):
    url_SE = href
    try:
        print(url_SE)
        response = requests.get(url_SE)
        soup = BeautifulSoup(response.content, 'html.parser', from_encoding='utf-8')

        # Extract title
        title_element = soup.find('div', {'id': 'cstm-db-title'}).find('h1')
        title = title_element.text.strip().encode('utf-8', errors='replace').decode('utf-8', errors='replace')

        # Table
        table = soup.find('table')
        table_data = []

        for row in table.find_all('tr'):
            
            tr = soup.find('tr')

            row_data = []
            hrefs_link = [td.find('a')['href'] for td in row.find_all('td') if td.find('a')]


            if hrefs_link and is_valid_url(hrefs_link[0]):                  
                try:
                    link_response = requests.get(hrefs_link[0], timeout=30)
                    link_response.raise_for_status()
                    
                except requests.exceptions.Timeout:
                    # In case there's a timeout link
                    timeout_links.append(hrefs_link)
                    pass

                except requests.exceptions.SSLError as e:
                    # In case there's a SLLError
                    sll_links.append(hrefs_link)
                    pass

                except requests.exceptions.RequestException as e:    
                    offline_links.append(hrefs_link)
                    if title in all_links:
                        all_links[title].append(hrefs_link)
                    else:
                        all_links[title] = [hrefs_link]
                        print(f"new added: {title} and {hrefs_link}")
    
    except Exception as e:
        print(f"Error while processing {url_SE}: {e}")

pprint.pprint(all_links)

with open("offline_links.txt", 'w') as f: 
    for key, value in all_links.items(): 
        f.write('%s:%s\n' % (key, value))

messagebox.showinfo("Completed", "Completed!")`;

export default WsCode;