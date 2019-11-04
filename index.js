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
    <li>
        <p>id: ${bookId}</p>
        <p>title: ${title}</p>
        <p>author: ${authorName}</p>
    </li>
`

const getBookList = books => {

    const bookItems = books.map(getBookItem)
        .join("")

    return `
        <ul>
            ${bookItems}
        </ul>
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

        const className = i === selected ? 'nav_item-selected' : 'nav_item'

        numberItems.push(`
            <li class=${className}>
                <button class='btn' onClick='onPageChange(${i})'>${i}</button>
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
        <ul class='nav'>
            ${items.join("")}
        </ul>
    `
}

const page = `<div id='page'>${getPageContent(1)}`

document.getElementById('root').innerHTML = page