const rangeOf = length => {
    const result = []
    for (i = 1; i <= length; ++i) {
        result.push(i)
    }
    return result
}

const getBookList = books => {

    const bookItems = books
        .map(({
            bookId, title, authorName
        }) => `
            <tr>
                <td>${bookId}</td>
                <td>${title}</td>
                <td>${authorName}</td>
            </tr>
        `)
        .join("")

    return `
        <table class='table table-hover'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
                ${bookItems}
            </tbody>
        </table>
    `
}

const getPageContent = num => {

    const books = rangeOf(20)
        .map(i => ({
            bookId: i,
            title: `book${i}`,
            authorName: `author${i}`
        })
    )

    const pageCount = Math.ceil(books.length / 6)
    const start = (num - 1) * 6
    const end = start + 6

    const currentBooks = books.slice(start, end)

    return `
        <div>
            ${getBookList(currentBooks)}
            ${getPageNavigator(num, pageCount)}
        </div>
    `
}

const getPageNavigator = (selected, length) => {

    const numberItems = rangeOf(length)
        .map( i => `
            <li class='${i === selected ? 'page-item active' : 'page-item'}'>
                <a class='page-link' href='#' onClick='onPageChange(${i})'>${i}</a>
            </li>
        `)
        .join("")

    return `
        <ul class='pagination'>
            <button class='btn' 
                ${selected === 1 ?  'disabled' : ''}
                onClick='onPageChange(${selected - 1})'><</button>
            ${numberItems}
            <button class='btn' 
                ${selected >= length ?  'disabled' : ''}
                onClick='onPageChange(${selected + 1})'>></button>
        </ul>
    `
}

const page = `<div id='page' class='container'>${getPageContent(1)}`

const onPageChange = num => {
    const page = document.getElementById('page')
    page.innerHTML = getPageContent(num)
}

document.getElementById('root').innerHTML = page