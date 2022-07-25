const displayController = (() => {
    const container = document.querySelector('.project')

    const test = function(){
        const testelement = document.createElement('div')
        testelement.textContent = 'displayController module added this text'
        container.appendChild(testelement)
    }

    return {test}

})();

export {displayController}