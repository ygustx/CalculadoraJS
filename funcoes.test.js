const { JSDOM } = require('jsdom');

// Importa suas funções
global.document = new JSDOM(`<!DOCTYPE html><p id="resultado"></p>`).window.document;

const { insert, clean, back, calcular } = require('./functional.js'); // Ajuste o caminho conforme necessário

describe('Testes das funções de calculadora', () => {
    beforeEach(() => {
        // Limpa o conteúdo antes de cada teste
        clean(document.getElementById('resultado'));
    });

    test('insert deve adicionar um número ao display', () => {
        insert('5');
        expect(document.getElementById('resultado').innerHTML).toBe('5');
    });

    test('clean deve limpar o display', () => {
        insert('5');
        clean(document.getElementById('resultado'));
        expect(document.getElementById('resultado').innerHTML).toBe('');
    });

    test('back deve remover o último caractere do display', () => {
        insert('123');
        back(document.getElementById('resultado'));
        expect(document.getElementById('resultado').innerHTML).toBe('12');
    });

    test('calcular deve calcular a expressão no display', () => {
        insert('2');
        insert('+');
        insert('2');
        calcular(document.getElementById('resultado'));
        expect(document.getElementById('resultado').innerHTML).toBe('4');
    });

    test('calcular deve exibir "Nada..." se o display estiver vazio', () => {
        calcular(document.getElementById('resultado'));
        expect(document.getElementById('resultado').innerHTML).toBe('Nada...');
    });

    test('calcular deve exibir "Erro" em caso de erro na expressão', () => {
        insert('2');
        insert('/');
        insert('0'); // Divisão por zero
        calcular(document.getElementById('resultado'));
        expect(document.getElementById('resultado').innerHTML).toBe('Erro');
    });
});
