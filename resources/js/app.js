require('./bootstrap');


window.onload = function () {


    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    let idxSetTimeout = null;

    const tbody = document.querySelector('tbody');
    const start = document.querySelector('#start');
    const stop = document.querySelector('#stop');
    const sort = document.querySelector('#sort');
    const output = document.querySelector('#output');
    const dropFilter = document.querySelector('#dropFilter');
    const filterRow = document.querySelector('#filter_row');
    const search = document.querySelector('#search');
    const searchInput = search.querySelector('#searchInput');
    const searchButton = search.querySelector('#searchButton');
    const searchDropdown = search.querySelector('#searchDropdown');
    const searchingResultValue = search.querySelector('#searching_result__value');

    stop.addEventListener('click', () => {
        if (idxSetTimeout !== null) {
            clearInterval(idxSetTimeout);
            idxSetTimeout = null;
        }
    });

    start.addEventListener('click', async () => {

        for (let countLoop = 0; countLoop < 20; countLoop++) {
            idxSetTimeout = await setTimeout(async () => {
                await fetch('/add', {
                    method: "POST",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                })
                    .then((response) => {
                        if (response.status !== 200) {
                            return Promise.reject();
                        }
                        return response.text()
                    })
                    .then(i => {
                        const result = JSON.parse(i);
                        if (result.length !== 0) {
                            const fullHTML = renderRowTable(
                                result['color'],
                                result['number'],
                                result['id'],
                                result['last_name'],
                                result['first_name'],
                                result['sex'],
                                result['bdate'],
                                result['city'],
                                result['last_seen'],
                                result['university_name'],
                                result['career'],
                                result['has_photo'],
                                result['interests'],
                                result['community'],
                                result['friends'],
                                result['followers_count'],
                                result['mobile_phone'],
                                result['email'],
                            );

                            tbody.insertAdjacentHTML('beforeEnd', fullHTML);
                        }
                    })
                    .catch(() => console.log('ошибка'));
            }, 1)
            await sleep(600);
            if (idxSetTimeout == null) {
                break;
            }
        }
        idxSetTimeout = null;
    });

    function renderRowTable(
        color,
        count,
        id,
        last_name,
        first_name,
        sex,
        bdate,
        city,
        last_seen,
        university_name,
        career,
        has_photo,
        interests,
        community,
        friends,
        followers_count,
        mobile_phone,
        email
    ) {
        let classColor = '';
        let fullHTML = '';
        if (color === 'red') {
            classColor = 'table-danger';
        } else if (color === 'blue') {
            classColor = 'table-primary';
        } else {
            classColor = 'table-success';
        }

        fullHTML = `
                    <tr class="${classColor}">
                        <th data-title="color" scope="col" class="main-column-1">${color}</th>
                        <td data-title="number" class="main-column-2">${count}</td>`;
        if (isNaN(id)) {
            fullHTML += `<td data-title="id" class="main-column-3">${id}</td>`;
        } else {
            fullHTML += ` <td data-title="id" class="main-column-3"><a href="https://vk.com/id${id}"
                                                     target="_blank">${id}</a></td>`;
        }

        fullHTML += `    <td data-title="last_name" class="main-column-4">${last_name}</td>
                        <td data-title="first_name" class="main-column-5">${first_name}</td>
                        <td data-title="sex" class="main-column-6">${sex}</td>
                        <td data-title="bdate" class="main-column-7">${bdate}</td>
                        <td data-title="city" class="main-column-8">${city}</td>
                        <td data-title="last_seen" class="main-column-9">${last_seen}</td>
                        <td data-title="university_name" class="main-column-10">${university_name}</td>
                        <td data-title="career" class="main-column-11">${career}</td>
                        <td data-title="has_photo" class="main-column-12">${has_photo}</td>
                        <td data-title="interests" class="main-column-13">${interests}</td>
                        <td data-title="community" class="main-column-14">${community}</td>
                        <td data-title="friends" class="main-column-15">${friends}</td>
                        <td data-title="followers_count" class="main-column-16">${followers_count}</td>
                        <td data-title="mobile_phone" class="main-column-17">${mobile_phone}</td>
                        <td data-title="email" class="main-column-18">${email}</td>
                    </tr>`;
        return fullHTML;
    }


    function getGeneralObject() {
        const filterColumns = filterRow.querySelectorAll('td');
        const arrayPriority = [];
        const arrayFilter = [];

        filterColumns.forEach(column => {
            const filter = column.querySelector('.filter');
            const priority = column.querySelector('.priority');

            if (filter.value !== 'Фильтр') {
                if (priority !== null) {
                    if (priority.value !== "Приоритет") {
                        arrayPriority.push({
                            title: column.dataset.title,
                            value: filter.value,
                            priority: +priority.value
                        });
                    }
                } else {
                    arrayFilter.push({
                        title: column.dataset.title,
                        value: filter.value
                    });
                }
            }
        });

        arrayPriority.sort(comparePriority);

        return {
            arrayPriority: arrayPriority,
            arrayFilter: arrayFilter
        }

    }

    function comparePriority(a, b) {
        return a.value - b.value;
    }

    sort.addEventListener('click', () => {

        const generalObject = getGeneralObject();
        $.ajax({
            url: '/allUsers',
            type: 'POST',
            data: {generalObject: JSON.stringify(generalObject)}, //вот тут
            dataType: 'json',
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: (i) => {
                tbody.innerHTML = insertTable(i);
            }
        });
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    output.addEventListener('click', () => {
        const generalObject = getGeneralObject();
        $.ajax({
            url: '/deleteRedRows',
            type: 'POST',
            data: {generalObject: JSON.stringify(generalObject)}, //вот тут
            dataType: 'json',
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: (i) => {
                tbody.innerHTML = insertTable(i);
            }
        });
    });

    function parseItemSearchDropdown(string, id) {
        return `<a class="dropdown-item" href="#${id}">${string}</a>`
    }

    const searchFunction = () => {
        const generalObject = getGeneralObject();
        $.ajax({
            url: '/allUsers',
            type: 'POST',
            data: {generalObject: JSON.stringify(generalObject)}, //вот тут
            dataType: 'json',
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: (rows) => {
                if (searchInput.value.trim() === '') {
                    tbody.innerHTML = insertTable(rows);
                    searchDropdown.textContent = '';
                    searchingResultValue.textContent = '0';
                } else {
                    const listSearchDropdown = [];
                    const searchingRegExp = new RegExp(searchInput.value, 'i');
                    let count = 0;
                    const resultRows = rows.filter(row => {
                        let result = false;
                        for (let key in row) {
                            if (searchingRegExp.test(row[key])) {
                                listSearchDropdown[count] = {
                                    string: row[key],
                                    id: 'search-' + count
                                };
                                if (key !== 'id') {
                                    row[key] = row[key].toString().replace(searchingRegExp, function (match) {
                                        return `<span class="searching_selected" id="${listSearchDropdown[count++].id}">${match}</span>`
                                    });
                                } else {
                                    const id = row[key];
                                    row[key] = row[key].toString().replace(searchingRegExp, function (match) {
                                        return `<span class="searching_selected" id="${listSearchDropdown[count++].id}">${match}</span>`
                                    });
                                    row[key] = `<a target="_blank" href="https://vk.com/id${id}">${row[key]}</a>`;

                                }
                                result = true;
                            }
                        }
                        return result;
                    });
                    tbody.innerHTML = insertTable(resultRows);
                    searchDropdown.innerHTML = insertSearchDropdown(listSearchDropdown);
                    searchingResultValue.textContent = listSearchDropdown.length;
                }
            }
        });
    }

    searchInput.addEventListener('keydown', event => {
        if (event.code === 'Enter') {
            searchFunction();
        }
    });

    searchButton.addEventListener('click', searchFunction);

    function insertSearchDropdown(array) {
        let fullHTML = '';
        array.forEach(item => {
            fullHTML += parseItemSearchDropdown(item.string, item.id);
        });
        return fullHTML;
    }

    function insertTable(array) {
        let fullHTML = '';
        array.forEach(row => {
            fullHTML += renderRowTable(
                row['color'],
                row['number'],
                row['id'],
                row['last_name'],
                row['first_name'],
                row['sex'],
                row['bdate'],
                row['city'],
                row['last_seen'],
                row['university_name'],
                row['career'],
                row['has_photo'],
                row['interests'],
                row['community'],
                row['friends'],
                row['followers_count'],
                row['mobile_phone'],
                row['email'],
            );
        });
        return fullHTML;
    }

    dropFilter.addEventListener('click',  () => {
        const filterColumns = filterRow.querySelectorAll('td');
        filterColumns.forEach(column => {
            const filter = column.querySelector('.filter');
            const priority = column.querySelector('.priority');
            filter.selectedIndex = 0;
            if (priority !== null) {
                priority.selectedIndex = 0;
            }
        });
    });
}
