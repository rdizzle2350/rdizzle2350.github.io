describe('Lab 4', () => {
  it('Successfully loads with valid HTML', () => {
    cy.fixture('test_values').then((json) => {
      const labUrl = `${json.test_context || ''}/lab_4/`;
      cy.visit(labUrl); // change URL to match your dev URL
      cy.htmlvalidate();
    });
  });

  it('should contain your name and lab number within the page title', () => {
    cy.fixture('test_values').then((json) => {
      cy.title().then(($title) => {
        const [name, lab, title] = [json.name, 'lab 4', $title].map((m) => m.toUpperCase());
        expect(title.includes(name)).to.be.true;
        expect(title.includes(lab)).to.be.true;
      });
    });
  });

  it('should correctly link to supplied lab styles.css', () => {
    cy.get('head link[href="styles.css"]');
  });

  it('should contain a div, class wrapper, which contains a div, class container, which holds the rest of your visible HTML', () => {
    cy.get('.wrapper .container');
  });

  it('Your .container div should include a div, class header, containing a headline with your name and the lab number in it', () => {
    cy.fixture('test_values').then((json) => {
      cy.get('.header h1')
        .then(($hh1) => {
          const [name, lab, title] = [json.name, 'lab 4', $hh1.text()].map((m) => m.toUpperCase());
          expect(title.includes(name)).to.be.true;
          expect(title.includes(lab)).to.be.true;
        });
    });
  });

  it('Should include an HTML form', () => {
    cy.get('form');
  });

  it('Should include an input field for text, with an id', () => {
    cy.get('form input[type=text]')
      .then(($ta) => {
        const id = $ta.attr('id');
        expect(id).to.exist;
      });
  });

  it('Your text input should have a <label> with correct for attribute', () => {
    cy.get('form input[type=text]')
      .then(($txt) => {
        const id = $txt.attr('id');
        cy.get(`form label[for=${id}]`);
      });
  });

  it('Should include a Textarea field that has 5 rows and 33 columns', () => {
    cy.get('form textarea')
      .then(($ta) => {
        const rows = Number($ta.attr('rows'));
        const cols = Number($ta.attr('cols'));

        expect(rows).to.be.greaterThan(4);
        expect(cols).to.be.greaterThan(32);
      });
  });

  it('Your Textarea field should have an id attribute', () => {
    cy.get('form textarea')
      .then(($ta) => {
        const id = $ta.attr('id');
        expect(id).to.exist;
      });
  });

  it('Your Textarea should have a <label> with correct for attribute', () => {
    cy.get('form textarea')
      .then(($txt) => {
        const id = $txt.attr('id');
        cy.get(`form label[for=${id}]`); // broken because getting only first label
      });
  });

  it('All form controls should have a name attribute, for identification of data on server', () => {
    cy.get('form textarea')
      .then(($txt) => {
        const name = $txt.attr('name');
        expect(name).to.exist;
      });
    cy.get('form input[type=text]')
      .then(($txt) => {
        const name = $txt.attr('name');
        expect(name).to.exist;
      });
    cy.get('form button')
      .then(($txt) => {
        const name = $txt.attr('name');
        expect(name).to.exist;
      });
  });

  it('Should use the submit button to POST material to the /api endpoint', () => {
    cy.get('form').should('have.attr', 'method', 'post');
    cy.get('button[type=submit]')
      .click();
    cy.contains('hello world', { matchCase: false });
  });

  it('Should receive a string containing "Hello World" from the server - use res.send from Express docs for this', () => {
    cy.fixture('test_values').then((json) => {
      const labUrl = `${json.test_context || ''}/lab_4/`;
      cy.visit(labUrl);
      cy.get('button[type=submit]')
        .click();
      cy.contains('hello world', { matchCase: false });
    });
  });

  it('Should link to the lab CSS file and be styled appropriately', () => {
    cy.get('body');
  });
});