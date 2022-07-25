const displayController = (() => {
    const container = document.querySelector('.project')

    const buildPage = function(entries){
        for (const entry of entries){
            showEntry(entry);
        }
    }

    const showEntry = function(listEntry){
        const entry = document.createElement('div')
        entry.textContent = listEntry.title
        container.appendChild(entry)
    }

    return {showEntry, buildPage}

})();

export {displayController}