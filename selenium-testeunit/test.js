const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');

describe('Teste com Selenium', function () {
  let driver;

  before(async function () {
    this.timeout(10000); // timeout para pagina nao fechar
    driver = await new Builder().forBrowser('firefox').build();
  });

  it('Adicionar ao cadastro', async function () {
    this.timeout(30000);
    await driver.get('file:///Users/lucasgaion/Desktop/testeSoftware/index.html'); //mudar aqui com base do caminho do testesoftware com pwd da para ver
 
    // estao os xpath de nome, sobrenome, cpf e submit(atualizar)
    const nomeInput = await driver.wait(until.elementLocated(By.xpath('//*[@id="nome"]'), 10000));
    const sobrenomeInput = await driver.wait(until.elementLocated(By.xpath('//*[@id="sobrenome"]'), 10000));
    const cpfInput = await driver.wait(until.elementLocated(By.xpath('//*[@id="cpf"]'), 10000));
    const submitButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="atualizar"]'), 10000));

    const nomes = 
                  [
                  'Juan',
                  'Lucas'
                  ];
    const sobrenomes = 
                      [
                      'Miarelli', 
                      'Gaion'
                      ];
    const cpfs = 
                [
                '12345678901', 
                '12345901'
                ];

    for (let i = 0; i < nomes.length; i++) { // for percorrendo e inserindo os nomes, quando inseri dar um clear
      
      await nomeInput.clear();
      await sobrenomeInput.clear();
      await cpfInput.clear();

      await nomeInput.sendKeys(nomes[i]);
      await sobrenomeInput.sendKeys(sobrenomes[i]);
      await cpfInput.sendKeys(cpfs[i]);

      await submitButton.click(); 

      await driver.takeScreenshot().then(function(data) {
        fs.writeFileSync(`screenshot_${nomes[i]}_${sobrenomes[i]}.png`, data, 'base64');
      });

      const elementoAdicionado = await driver.wait(until.elementLocated(By.css('.item'), 30000));


    }
  });

  after(async function () {
    await driver.quit();
  });
});
