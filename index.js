const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const courses = [
      'Análise e Desenvolvimento de Sistemas',
    //   'Agronomia',
    //   'Arquitetura e Urbanismo',
    //   'Automação Industrial',
    //   'Ciência de Dados e Business Intelligence',
    //   'Design de Interiores',
    //   'Engenharia Ambiental e Sanitária',
    //   'Engenharia Civil'
  ];

  for (const course of courses) {
    const courseName = course.toLowerCase()
                               .replace(/\s/g, "-")
                               .normalize("NFD")
                               .replace(/[\u0300-\u036f]/g, "")

    const page = await browser.newPage();

    //Acessa a página do curso
    await page.goto(`https://www.unicesumar.edu.br/ead/cursos-graduacao/${courseName}`);  
    
    await page.select("select#selEstado", "PR")

    await page.waitFor(3000)

    await page.select("select#selPolo", "13")

    await page.waitFor(3000)

    //Pega o valor do curso
    const element = await page.waitForSelector('#precoDemais');
    const price = await element.evaluate(el => el.textContent);

    console.log(`O preço do curso ${course} é R$ ${price}`)
  }
//   await browser.close();
})();