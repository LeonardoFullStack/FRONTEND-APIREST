const puppeteer = require('puppeteer');


async function webScraping() {
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  
  await page.goto('http://localhost:4000/servicios');

  
  const searchResults = await page.evaluate(() => {
    
    const results = []
    const items = document.querySelectorAll('.servicios');

  
    items.forEach(item => {
      const data = {}
      const date = item.querySelector('.right').textContent;
      const serviceName = item.querySelector('H2').textContent ;
      const service = item.querySelector('.description').textContent;
      const link = item.querySelector('a')
      const button = link.querySelector('button')
      const id = button.id
      data.servicios=serviceName;
      data.descripciones =service;
      data.fechas =date;
      data.id = id
      results.push(data)
      
    });
    return results; 
  });

 
  await browser.close();

 
  return searchResults
}


module.exports = {
    webScraping
}

