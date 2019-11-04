const generateBooks = () => {
    const result = []
    for (i = 1; i <= 20; ++i) {
        result.push({
            bookId: i,
            title: `book${i}`,
            authorName: `author${i}`
        })
    }
    return result
}

const getBookItem = ({
    bookId, title, authorName
}) => `
    <tr>
        <td>${bookId}</td>
        <td>${title}</td>
        <td>${authorName}</td>
    </tr>
`

const getBookList = books => {

    const bookItems = books.map(getBookItem)
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

    const books = generateBooks()

    const pageCount = Math.ceil(books.length / 6)

    const start = (num - 1) * 6
    const end = start + 6

    const currentBooks = books.slice(start, end)

    const bookList = getBookList(currentBooks)

    const nav = getPageNavigator(num, pageCount)

    return `
        <div>
            ${bookList}
            ${nav}
        </div>
    `
}

const onPageChange = num => {

    const page = document.getElementById('page')

    page.innerHTML = getPageContent(num)
}


const getPageNavigator = (selected, length) => {

    const numberItems = []

    for (i = 1; i <= length; ++i) {

        const className = i === selected ? 'page-item active' : 'page-item'

        console.log(`class: ${className}`)

        numberItems.push(`
            <li class='${className}'>
                <a class='page-link' href='#' onClick='onPageChange(${i})'>${i}</a>
            </li>
        `)
    }

    const leftArrow = `
        <button class='btn' 
            ${selected === 1 ?  'disabled' : ''}
            onClick='onPageChange(${selected - 1})'><</button>
    `

    const rightArrow = `
        <button class='btn' 
            ${selected >= length ?  'disabled' : ''}
            onClick='onPageChange(${selected + 1})'>></button>
    `

    const items = [leftArrow, ...numberItems, rightArrow];

    return `
        <ul class='pagination'>
            ${items.join("")}
        </ul>
    `
}

const page = `<div id='page' class='container'>${getPageContent(1)}`

document.getElementById('root').innerHTML = page