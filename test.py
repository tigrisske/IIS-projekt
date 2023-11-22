import requests
import bs4

url = 'https://www.fit.vutbr.cz/study/courses/IIS/private/projekt/doc.html'

#download the webpage

if __name__ == '__main__':
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0',
        'Cookie': '_ga=GA1.2.1348217404.1676300826; cosign-WebFIT=0EdCobCNcz0hHtsXa4Zf6wagqTGCYlMosZqnKYnsHhSa54BGHLQyx2Xev7vAWvkahVqRF1T3ZXjPtn5gqbgfsSDuu1+OnrwYhXm-2GElEnv+rlMUDIZxcBf6xnTm/1700651590'
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    soup = bs4.BeautifulSoup(response.text, 'html.parser')
    
    # write to doc.html
    with open('doc.html', 'w', encoding='utf-8') as f:
        f.write(response.text)
        
    